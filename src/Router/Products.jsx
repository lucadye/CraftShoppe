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
  return (<Container fluid className="d-flex justify-content-evenly flex-wrap">
    <h2>All Products</h2>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <Card title="Heart Button <3"
      src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      button={CartButton}
      >A quality metal button with a simple heart design.
    </Card>
    <hr/>
  </Container>);
}

export default Products;
