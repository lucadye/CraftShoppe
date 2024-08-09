import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { formatMoney } from '../helpers';
import CheckoutForm from '../Components/CheckoutForm';

import { getProductList } from '../api/products';
import { checkoutStart, checkoutFinish } from '../api/checkout';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Checkout() {
  // Create a stripe payment intent
  const [clientSecret, setClientSecret] = useState(null);
  useEffect(() => {
    // Don't repeat this function
    if (clientSecret !== null) return;
    checkoutStart().then(setClientSecret);
  }, [clientSecret]);

  // Get cart data
  const cartId = useSelector(state => state.user.cart_id);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    // Don't repeat this function call
    if (products !== null) return;
    getProductList(cartId)
    .then(({products}) => setProducts(products));
  }, [cartId, products]);

  // Wait for stripe request to finish
  if (clientSecret === null) return;
  // Wait for cart data before rendering
  if (products     === null) return;

  // Get totals
  let totalCount = 0;
  let totalPrice = 0;
  products.forEach(product => {
    totalCount += product.count;
    const price = product.price + product.option.price_mod;
    totalPrice += price * product.count;
  });

  const Products = () => (
    <Table striped bordered style={{width: 'fit-content', marginBottom: '1.5rem'}}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th># of items</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {products.map(({option, ...product}) => {
          const price = product.price + option.price_mod;
          const totalPrice = price * product.count;
          return (
            <tr key={product.id + option.id}>
              <td><Link to={'/products/' + product.id}>{product.name} {option.id !== 1 ? `(${option.name})` : ''}</Link></td>
              <td>{formatMoney(price)}</td>
              <td>{totalCount}</td>
              <td>{formatMoney(totalPrice)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (<Container fluid>
    <h2>Checkout</h2>
    <Products/>
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm totalPrice={formatMoney(totalPrice)}/>
    </Elements>
  </Container>);
}

function CheckoutReturn () {
  const [wait, setWait] = useState(true);
  useEffect(() => {
    checkoutFinish().then(()=>setWait(false));
  })
  if (wait) return;
  return <Navigate to="/orders/latest" replace={true} />
}

export {
  Checkout,
  CheckoutReturn
};
