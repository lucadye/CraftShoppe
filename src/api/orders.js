import api from './index';
import { getProductList } from './products';
import { getState } from '../store';
import { formatDate } from '../helpers';

function formatStatus (order) {
  switch (order.status) {
    case 'fulfilled': return 'Complete';
    case 'rejected' : return 'Cancelled';
    case 'pending'  : return 'In Progress';
    default         : throw new Error(`Invalid order status! Order ID: ${order.id}`);
  }
}

export async function getOrders() {
  const {user} = getState();
  const orders = await api.GET(`/users/${user.id}/orders`);
  for (let i in orders) {
    orders[i].status = formatStatus(orders[i]);
    orders[i].datetime = formatDate(orders[i].datetime);
    orders[i].productList = (await getProductList(orders[i].list_id)).products;
  };
  return orders;
}

export async function getOrder(orderId) {
  const {user} = getState();
  const order = await api.GET(`/users/${user.id}/orders/${orderId}`);
  order.status = formatStatus(order);
  order.datetime = formatDate(order.datetime);
  order.productList = (await getProductList(order.list_id)).products;
  return order;
}

export async function getLatestOrder() {
  const {user} = getState();
  const order = await api.GET(`/users/${user.id}/orders/latest`);
  order.status = formatStatus(order);
  order.datetime = formatDate(order.datetime);
  order.productList = (await getProductList(order.list_id)).products;
  return order;
}

export async function checkout(name, password) {
  return await api.POST('/checkout');
}
