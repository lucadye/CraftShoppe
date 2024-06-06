import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function DetailsButton({id}) {
  return (
    <Link to={"/products/" + id}>
      <Button>
        Details
      </Button>
    </Link>
  );
}

function AddToCartButton({id, style}) {
  return (
    <Button
      style={style}
      onClick={()=>alert(`Added product with id ${id} to cart!`)}
      >Add to Cart
    </Button>
  );
}

export {
  DetailsButton,
  AddToCartButton,
};

function ProductButtons(id) {
  return () => (<Container className="d-flex justify-content-left gap-4">
    <DetailsButton id={id} />
    <AddToCartButton id={id} />
  </Container>);
}

export default ProductButtons;
