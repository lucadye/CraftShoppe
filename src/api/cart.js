import api from './index';
import { getState } from '../store';
import { formatMoney } from '../helpers'
import {
  getProductImages,
  getProductList,
  patchProductList
} from './products';

export async function getCart() {
  const {cart_id} = getState().user;
  if (cart_id !== null) {
    const {products} = await getProductList(cart_id);
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
}

export async function addToCart(product) {
  const {cart_id} = getState().user;
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
