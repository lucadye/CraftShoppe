import { useState, useEffect } from 'react';
import { getProduct } from '../api/products';
import { addToCart } from '../api/cart';
import { formatNumber } from '../helpers';
import { useSelector } from 'react-redux';

import { useParams, Link, Navigate } from 'react-router-dom';
import { AddToCartButton } from '../Components/ProductButtons';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';

function CommonPageData({children, showAlert, setShowAlert, amount, setRedirectUrl}) {
  return (
    <Container fluid>

    {showAlert ? (
      <div
        className="position-fixed"
        style={{
          zIndex: '2',
          width: '100%', height: '100%',
          top: '0', left: '0',
          backgroundColor: '#0007',
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center"
          style={{width: '100%', height: '75%'}}
        >
          <Alert variant="light">
            <Alert.Heading>Added {amount} product{amount > 1 ? 's' : ''} to your cart</Alert.Heading>
            <div className="d-flex justify-content-start gap-3 mt-4">
              <Button
                onClick={() => setShowAlert(false)}
                variant="primary"
                >Continue browsing
              </Button>
              <Button
                onClick={() => setRedirectUrl('/cart')}
                variant="primary"
                >Go to cart
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    ) : ''}

      <Link className="plain" to="/products">{"< Back to Products"}</Link>
      <Row>
        {children}
      </Row>

    </Container>
  );
}

function ProductDetails() {
  const signedIn = useSelector(state => state.user.signedIn);
  const [redirectUrl, setRedirectUrl] = useState('');

  let { productId } = useParams();
  const [product, setProduct] = useState(undefined);
  const [optionId, setOptionId] = useState(undefined);
  const [amount, setAmount] = useState(1);

  const [showAlert, setShowAlert] = useState('');

  useEffect(() => {
    getProduct(productId).then(r => setProduct(r));
  }, []);

  if (redirectUrl) return <Navigate to={redirectUrl}/>;

  if (product === undefined) {
    return (
      <CommonPageData showAlert={showAlert} setShowAlert={setShowAlert}>
        <Col className="border d-flex justify-content-center align-items-center" md={6}>
          <Spinner
            variant="secondary"
            animation="border"
            role="status"
            ><span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
        <Col md>
          <div className="d-flex flex-column justify-content-between gap-5" style={{width: '100%'}}>
            <Placeholder as="h3" animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as="p" animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button style={{marginTop: 'auto'}} variant="primary" />
          </div>
        </Col>
      </CommonPageData>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!signedIn) return setRedirectUrl('/login');
    addToCart({
      id: Number(productId),
      option_index: Number(optionId),
      count: amount,
    });
    setShowAlert(true);
  }

  function onOptionChange(e) {
    setOptionId(e.target.value);
  }

  function changeAmount(value) {
    value = formatNumber(value);
    if (value === '') return setAmount('');
    value = value < 1 ? 1 : value;
    value = value > 999 ? 999 : value;
    setAmount(value);
  }

  return (
    <CommonPageData
      showAlert={showAlert}
      setShowAlert={setShowAlert}
      amount={amount}
    >
      <Col md={6}>
        { product.images.length > 1 ? (
          <Carousel>
            {product.images.map((src, key) => {
              return (
                <Carousel.Item key={key}>
                  <img src={src} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : product.images.length === 1 ? (
          <img style={{width: '100%'}} src={product.images[0]} />
        ) : ''}
      </Col>
      <Col md>
        <div className="d-flex flex-column justify-content-left" style={{width: '100%', height: '100%'}}>
          <h3>{product.name}</h3>
          <p>
            {product.description}
            <br/>
            {product.price}
          </p>

          <Form style={{marginTop: 'auto'}} onSubmit={onSubmit}><Row>
            <Col>
              <Form.Group style={{marginBottom: '1rem'}}>
                <Form.Label>Product Options</Form.Label>
                <Form.Select defaultValue="0" aria-label="Product Options" onChange={onOptionChange}>
                  <option value="0" disabled>Select an option</option>
                  {product.options.map(({name, priceMod}, index) => {
                    return (<option key={index + 1} value={index + 1}>{name} {priceMod ? `[${priceMod}]` : ''}</option>);
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group style={{marginBottom: '1rem'}}>
                <Form.Label style={{width: '100%'}}>Amount</Form.Label>
                <ButtonGroup aria-label="Product Amount">

                  <Button
                    variant="light"
                    onClick={e => {
                      e.preventDefault();
                      changeAmount(amount - 1);
                    }}
                    >-
                  </Button>

                  <Button variant="light">
                    <Form.Control
                      defaultValue="1"
                      aria-label="Product Amount"
                      onChange={e => {
                        e.preventDefault();
                        changeAmount(e.target.value);
                      }}
                      style={{width: `calc(2rem + ${String(amount).length}ch)`}}
                      value={amount}
                    />
                  </Button>

                  <Button
                    variant="light"
                    onClick={e => {
                      e.preventDefault();
                      changeAmount(amount + 1);
                    }}
                    >+
                  </Button>

                </ButtonGroup>
              </Form.Group>
            </Col>
            <AddToCartButton disabled={optionId === undefined || amount === ''} id={productId} />
          </Row></Form>
        </div>
      </Col>
    </CommonPageData>
  );
}

export default ProductDetails;
