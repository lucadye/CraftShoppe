import api from './index';
import { formatMoney } from '../helpers'

async function getProduct(id) {
  const product = await api.GET('/products/' + id);
  product.price = formatMoney(product.price);
  product.options = await api.GET('/products/' + id + '/options');
  product.options = product.options.map(o => {
    const price_mod = o.price_mod;
    if (o.price_mod > 0) o.price_mod = '+' + formatMoney(o.price_mod);
    else if (o.price_mod < 0) o.price_mod = '-' + formatMoney(o.price_mod);
    else o.price_mod = '';
    return {
      name: o.name,
      priceMod: o.price_mod,
      price_mod,
    };
  });
  product.images = await getProductImages(product.id);
  return product;
}

async function getAllProducts() {
  const products = await api.GET('/products');
  for (let p of products) {
    p.price = formatMoney(p.price);
    p.images = await getProductImages(p.id)
  }
  return products;
}

async function getProductImages(id) {
  const images = await api.GET('/images/' + id);
  return images.map(img => {
    return process.env.REACT_APP_API_URL + img.path;
  })
}

export {
  getProduct,
  getAllProducts,
  getProductImages,
};
