import { useState, useEffect } from 'react';
import { formatMoney } from '../helpers';
import { getOrders } from '../api/orders';

function Checkout() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (orders !== null) return;
    getOrders().then(r => setOrders(r));
  }, []);

  return (
    <h2>Order History</h2>
  );
}

export default Checkout;
