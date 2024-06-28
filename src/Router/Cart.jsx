import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCart } from '../api/cart';
import { formatMoney } from '../helpers';

import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

function formatOption({name, priceMod, ...rest}) {
  let str = name;
  if (priceMod) str += ` [${priceMod}]`;
  return str
}

function Cart() {
  const signedIn = useSelector(state => state.user.signedIn);

  const [cart, setCart] = useState(null);
  useEffect(() => {
  	if (!signedIn) return;
    getCart().then(c => setCart(c));
  }, [signedIn]);

  if (!signedIn) return <Navigate to="/login"/>;

  if (cart === null || cart === undefined) {
    return (
      <Container fluid>
        <h2>Cart</h2>
        <Spinner
          variant="secondary"
          animation="border"
          role="status"
          ><span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  let total = 0;

  return (
    <Container fluid>
      <h2>Cart</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Option</th>
            <th>#</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((p, i) => {
            total += (Number(p.price) + Number(p.option.price_mod)) * Number(p.count);
            return (
              <tr key={i}>
                <td><Link to={'/products/' + p.id}>{p.name}</Link></td>
                <td>{formatMoney(p.price)}</td>
                <td>{formatOption(p.option)}</td>
                <td>{p.count}</td>
                <td>{formatMoney((Number(p.price) + Number(p.option.price_mod)) * Number(p.count))}</td>
              </tr>
            );
          })}
          <tr>
            <td colspan="3"></td>
            <td>Total:</td>
            <td>{formatMoney(total)}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;
