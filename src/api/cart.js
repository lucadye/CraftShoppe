import api from './index';
import { getState, dispatch } from '../store';
import { formatMoney } from '../helpers'
import {
  getProductImages,
  getProductList,
  patchProductList,
  createProductList
} from './products';
import { setUserData } from '../store/userSlice';

export async function getCart() {
  const {user} = getState();
  const {cart_id} = user;
  if (cart_id === null) return;
  const results = await getProductList(cart_id);
  if (results.status === 404) {
    await api.PATCH('/users/'+user.id, {cart_id: null});
    dispatch(setUserData({...user, cart_id: null}));
    return null;
  }
  const {products} = results;
  if (products === undefined) return null;
  const cart = [];
  for (let p of products) {
    const o = p.option;

    const price_mod = o.price_mod;
    if (o.price_mod > 0) o.price_mod = '+' + formatMoney(o.price_mod);
    else if (o.price_mod < 0) o.price_mod = '-' + formatMoney(o.price_mod);
    else o.price_mod = '';

    const images = await getProductImages(p.id);
    const image = images.length ? images[0] : undefined;
    cart.push({
      ...p,
      image,
      option: {
        ...o,
        price_mod,
        priceMod: o.price_mod,
      },
    });
  };
  return cart;
}

async function createCart(product) {
  const user = getState().user;
  const {id: cart_id} = await createProductList([product]);
  await api.PATCH('/users/'+user.id, {cart_id});
  dispatch(setUserData({...user, cart_id}));
}

export async function addToCart(product) {
  const {cart_id} = getState().user;
  if (cart_id === null) return createCart(product);
  const {products} = await getProductList(cart_id);
  if (products) {
    for (let p of products) {
      if (p.id === product.id && p.option === product.option) {
        product.count += p.count;
      }
    }
  }
  if (cart_id !== null) {
    return await patchProductList(cart_id, [product]);
  }
}

export async function updateCart(product) {
  const {cart_id} = getState().user;
  if (cart_id !== null) {
    return await patchProductList(cart_id, [product]);
  }
}
