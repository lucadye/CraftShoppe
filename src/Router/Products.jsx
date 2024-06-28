import { getAllProducts } from '../api/products';
import { useState, useEffect } from 'react';

import Card from '../Components/Card';
import ProductButtons from '../Components/ProductButtons';
import Container from 'react-bootstrap/Container';

function Products() {
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    getAllProducts().then(r => setProducts(r));
  }, []);

  if (products === undefined) {
    return (<Container fluid className="d-flex justify-content-evenly flex-wrap">
      <h2>Products</h2>
      <Card placeholder />
      <Card placeholder />
      <Card placeholder />
    </Container>);
  }

  return (<Container fluid className="d-flex justify-content-evenly flex-wrap">
    <h2>Products</h2>
    {products.map((p, i) => {
      return (
        <Card key={i} title={p.name}
          src={p.images[0]}
          button={ProductButtons(p.id)}
          >{p.description}<br/>{p.price}
        </Card>
      );
    })}
  </Container>);
}

export default Products;
