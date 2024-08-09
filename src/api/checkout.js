import api from './index';

async function checkoutStart () {
  return (await api.POST('/checkout/start')).clientSecret;
}

async function checkoutFinish () {
  return await api.POST('/checkout/finish');
}

export {
  checkoutStart,
  checkoutFinish
};
