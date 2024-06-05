import Card from '../Components/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CartButton() {
  return (
    <Button
      onClick={()=>alert('Added to cart!')}
      >Add to Cart
    </Button>
  );
}

function FeaturedProducts() {
  return (<Container fluid className="d-flex justify-content-between flex-wrap">
    <h2>Featured Products</h2>
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
    <div className="d-flex justify-content-center" style={{width: '100%'}}>
      <Button href="/products" className="more-products btn-lg mx-auto">View More</Button>
    </div>
  </Container>);
}

function About() {
  return (<Container fluid>
    <h2 id="about">About Us</h2>
    <Container fluid>
      <Row>
        <Col sm={4}>
          <img src="https://images.unsplash.com/photo-1569513586164-80529357ad6f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </Col>
        <Col sm={4}><p className="lg">
          We're a bunch of craft-obsessed friends who believe that creativity is better when shared. Our love for arts and crafts brought us together, and now we're thrilled to share our passion with you!
        </p></Col>
        <Col sm={4}><p className="lg">
          Whether you're looking for a special gift or a charming addition to your space, we've got something for everyone. Our mission is to share our creative spirit and help you find that perfect piece that speaks to your artistic soul.
        </p></Col>
      </Row>
      <Row>
        <Col sm style={{width: '50%', margin: '0 25%'}}>
          <hr/>
          <p className="x-lg text-center" style={{width: '100%'}}>
            Join us on this colorful journey, and let's make something beautiful together!
          </p>
          <p className="xx-lg text-center" style={{width: '100%'}}>
            Happy crafting!
          </p>
        </Col>
      </Row>
    </Container>
  </Container>);
}

function Contact() {
  return (<Container fluid>
    <h2 id="contact">Contact</h2>
    <Container fluid>
      <Row>
        <Col sm><p className="lg">
          Have something to say? We'd love to hear from you! Whether you have a question about our products, want to discuss a custom commission, or need assistance with an order, we're here to help.
        </p></Col>
        <Col sm>
          <Card contact
            title="Call or Text Us!"
            >Our phone number is +1 234-567-8910
          </Card>
        </Col>
        <Col sm>
          <Card contact
            title="Email Us!"
            >Our email address is contact@craftshoppe.art
          </Card>
        </Col>
      </Row>
    </Container>
  </Container>);
}

function Home() {
  return <>
    <FeaturedProducts/>
    <hr/>
    <About/>
    <hr/>
    <Contact/>
    <hr/>
  </>
}

export default Home;
