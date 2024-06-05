import { getAllProducts } from '../api/products';
import { useState, useEffect } from 'react';

import Card from '../Components/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


function CartButton() {
  return (
    <Button
      onClick={()=>alert('Added to cart!')}
      >Add to Cart
    </Button>
  );
}

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(r => setProducts(r));
  }, []);

  return (<Container fluid className="d-flex justify-content-evenly flex-wrap">
    <h2>All Products</h2>
    {products.map(p => {
      return (
        <Card title={p.name}
          src={p.images[0]}
          button={CartButton}
          >{p.description}
        </Card>
      );
    })}
    <hr/>
  </Container>);
}

export default Products;
