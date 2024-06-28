import api from './index';
import { getState } from '../store';
import { formatMoney } from '../helpers'


async function getProductList(id) {
  return await api.GET('/product-lists/' + id);
}

async function patchProductList(id, list) {
  return await api.PATCH('/product-lists/' + id, {products: list});
}

export async function getCart() {
  const {cart_id} = getState().user;
  if (cart_id !== null) {
    const cart = await getProductList(cart_id);
    return cart.products.map(({option: o, ...p}) => {
      const price_mod = o.price_mod;
      if (o.price_mod > 0) o.price_mod = '+' + formatMoney(o.price_mod);
      else if (o.price_mod < 0) o.price_mod = '-' + formatMoney(o.price_mod);
      else o.price_mod = '';
      return {
        ...p,
        option: {
          ...o,
          price_mod,
          priceMod: o.price_mod,
        },
      };
    });
  }
}

export async function addToCart(product) {
  const {cart_id} = getState().user;
  if (cart_id !== null) {
    return await patchProductList(cart_id, [product]);
  }
}
