import api from './index';

async function getProduct(id) {
  const product = await api('/products/' + id);
  const images = await api('/images/' + product.id);
  product.images = images.map(img => {
    return process.env.REACT_APP_API_URL + img.path;
  })
  return product
}

async function getAllProducts() {
  const products = await api('/products');
  for (let p of products) {
    const images = await api('/images/' + p.id);
    p.images = images.map(img => {
      return process.env.REACT_APP_API_URL + img.path;
    })
  }
  return products
}

export {
  getProduct,
  getAllProducts,
};
