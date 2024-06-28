import { useState, useEffect } from 'react';
import { getProduct } from '../api/products';
import { addToCart } from '../api/cart';

import { useParams, Link } from 'react-router-dom';
import { AddToCartButton } from '../Components/ProductButtons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

function CommonPageData({children}) {
  return (
    <Container fluid>
      <Link className="plain" to="/products">{"< Back to Products"}</Link>
      <Row>
        {children}
      </Row>
    </Container>
  );
}

function ProductDetails() {
  let { productId } = useParams();
  const [product, setProduct] = useState(undefined);
  const [optionId, setOptionId] = useState(undefined);

  useEffect(() => {
    getProduct(productId).then(r => setProduct(r));
  }, []);

  if (product === undefined) {
    return (
      <CommonPageData>
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
    addToCart({
      id: Number(productId),
      option_index: Number(optionId),
      count: 1,
    });
    e.preventDefault();
  }

  function onChange(e) {
    setOptionId(e.target.value);
  }

  return (
    <CommonPageData>
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
          <Form style={{marginTop: 'auto'}} onSubmit={onSubmit}>
            <Form.Group style={{margin: '0 1rem 1rem 0'}}>
              <Form.Label>Product Options</Form.Label>
              <Form.Select defaultValue="0" aria-label="Product Options" onChange={onChange}>
                <option value="0" disabled>Select an option</option>
                {product.options.map(({name, priceMod}, index) => {
                  return (<option key={index + 1} value={index + 1}>{name} {priceMod ? `[${priceMod}]` : ''}</option>);
                })}
              </Form.Select>
            </Form.Group>
            <AddToCartButton disabled={optionId === undefined} id={productId} />
          </Form>
        </div>
      </Col>
    </CommonPageData>
  );
}

export default ProductDetails;
