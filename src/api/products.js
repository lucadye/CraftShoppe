import api from './index';

function formatMoney(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

async function getProduct(id) {
  const product = await api.GET('/products/' + id);
  product.price = formatMoney(product.price);
  product.options = await api.GET('/products/' + id + '/options');
  product.options = product.options.map(o => {
    if (o.price_mod > 0) o.price_mod = '+' + formatMoney(o.price_mod);
    else if (o.price_mod < 0) o.price_mod = '-' + formatMoney(o.price_mod);
    else o.price_mod = '';
    return {
      name: o.name,
      priceMod: o.price_mod
    };
  });
  const images = await api.GET('/images/' + product.id);
  product.images = images.map(img => {
    return process.env.REACT_APP_API_URL + img.path;
  })
  return product;
}

async function getAllProducts() {
  const products = await api.GET('/products');
  for (let p of products) {
    p.price = formatMoney(p.price);
    const images = await api.GET('/images/' + p.id);
    p.images = images.map(img => {
      return process.env.REACT_APP_API_URL + img.path;
    })
  }
  return products;
}

export {
  getProduct,
  getAllProducts,
};
