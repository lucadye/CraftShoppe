import api from './index';

function formatMoney(num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}

async function getProduct(id) {
  const product = await api('/products/' + id);
  product.price = formatMoney(product.price);
  const images = await api('/images/' + product.id);
  product.images = images.map(img => {
    return process.env.REACT_APP_API_URL + img.path;
  })
  return product;
}

async function getAllProducts() {
  const products = await api('/products');
  for (let p of products) {
    p.price = formatMoney(p.price);
    const images = await api('/images/' + p.id);
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
