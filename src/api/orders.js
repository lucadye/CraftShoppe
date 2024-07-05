import api from './index';
import { getProductList } from './products';
import { getState } from '../store';
import { formatDate } from '../helpers';

export async function getOrders() {
  const {user} = getState();
  const orders = await api.GET(`/users/${user.id}/orders`);
  for (let i in orders) {
    const {status, datetime} = orders[i];
    switch (status) {
      case 'fulfilled': orders[i].status = 'Complete'   ; break;
      case 'rejected' : orders[i].status = 'Cancelled'  ; break;
      case 'pending'  : orders[i].status = 'In Progress'; break;
    }
    orders[i].datetime = formatDate(datetime);
    orders[i].productList = (await getProductList(orders[i].list_id)).products;
  };
  return orders;
}

export async function getOrder(orderId) {
  const {user} = getState();
  const order = await api.GET(`/users/${user.id}/orders/${orderId}`);
  const {status, datetime} = order;
  switch (status) {
    case 'fulfilled': order.status = 'Complete'   ; break;
    case 'rejected' : order.status = 'Cancelled'  ; break;
    case 'pending'  : order.status = 'In Progress'; break;
  }
  order.datetime = formatDate(datetime);
  order.productList = (await getProductList(order.list_id)).products;
  return order;
}

export async function checkout(name, password) {
  return await api.POST('/checkout');
}
