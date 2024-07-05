import { useState, useEffect } from 'react';
import { formatMoney } from '../helpers';
import { getOrder } from '../api/orders';
import { Link, useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function Orders() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    if (order !== null) return;
    getOrder(orderId).then(r => setOrder(r));
  }, []);

  if (order === null) return (<Container Fluid>
    <Link className="plain" to="/orders">{"< Back to Order History"}</Link>
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

  let totalCount = 0;
  let totalPrice = 0;
  order.productList.forEach(product => {
    totalCount += product.count;
    const price = product.price + product.option.price_mod;
    totalPrice += price * product.count;
  });

  return (<Container fluid className="d-flex flex-column gap-1">
    <Link className="plain" to="/orders">{"< Back to Order History"}</Link>
    <h3>Order Information</h3>
    <Table striped bordered style={{width: 'fit-content'}}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Status</th>
          <th># of items</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.datetime}</td>
          <td>{order.status}</td>
          <td>{totalCount}</td>
          <td>{formatMoney(totalPrice)}</td>
        </tr>
      </tbody>
    </Table>
    <Table striped bordered style={{width: 'fit-content'}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th># of items</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {order.productList.map(({option, ...product}) => {
          const price = product.price + option.price_mod;
          const totalPrice = price * product.count;
          return (
            <tr key={order.id}>
              <td><Link to={'/products/' + product.id}>{product.name} {option.id !== 1 ? `(${option.name})` : ''}</Link></td>
              <td>{formatMoney(price)}</td>
              <td>{totalCount}</td>
              <td>{formatMoney(totalPrice)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </Container>);
}

export default Orders;
