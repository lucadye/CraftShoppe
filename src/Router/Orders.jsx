import { useState, useEffect } from 'react';
import { formatMoney } from '../helpers';
import { getOrders } from '../api/orders';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function Orders() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    if (orders !== null) return;
    getOrders().then(r => setOrders(r));
  }, []);

  if (orders === null) return (<Container fluid>
    <h2>Order History</h2>
    <Container fluid
      className="d-flex justify-content-center align-items-center position-fixed m-0 p-0"
      style={{zIndex: '2', top: '0', left: '0', height: '100%'}}>
      <Spinner
        style={{width: '8rem', height: '8rem', borderWidth: '1rem'}}
        variant="secondary"
        animation="border"
        role="status"
        ><span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  </Container>);

  return (<Container fluid>
    <h2>Order History</h2>
    <Table striped bordered style={{width: 'fit-content', margin: '0 auto'}}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
          <th># of items</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => {
          let totalCount = 0;
          let totalPrice = 0;
          order.productList.forEach(product => {
            totalCount += product.count;
            const price = product.price + product.option.price_mod;
            totalPrice += price * product.count;
          });
          return (
            <tr key={order.id}>
              <td>{order.datetime}</td>
              <td>{order.status}</td>
              <td>{totalCount}</td>
              <td>{formatMoney(totalPrice)}</td>
              <td><Link to={'/orders/' + order.id}>View Details</Link></td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </Container>);
}

export default Orders;
