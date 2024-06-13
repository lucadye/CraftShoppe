import Card from '../Components/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { useState, useEffect } from 'react';
import { getProduct } from '../api/products';
import ProductButtons from '../Components/ProductButtons';

function ProductCard({id}) {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    getProduct(id).then(r => setProduct(r));
  }, [id]);

  return product === undefined ? (
    <Card placeholder />
  ) : (
    <Card title={product.name}
      src={product.images[0]}
      button={ProductButtons(id)}
      >{product.description}<br/>{product.price}
    </Card>
  );
}

function Home() {
  return (<Container fluid className="d-flex justify-content-evenly flex-wrap" style={{gap: '1rem', marginBottom: '4rem'}}>
    <h2>Featured Products</h2>
    <ProductCard id="1"/>
    <hr style={{margin: '0 0 2.5rem'}} />
    <div className="d-flex justify-content-center" style={{width: '100%', flexWrap: 'wrap', gap: '1rem'}}>
      <Button href="/about" className="btn-lg">About Us</Button>
      <Button href="/contact" className="btn-lg">Contact Us</Button>
      <Button href="/products" className="btn-lg">All Products</Button>
    </div>
  </Container>);
}

export default Home;
