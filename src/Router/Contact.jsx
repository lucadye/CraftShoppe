import Card from '../Components/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Contact() {
  return (<Container fluid>
    <h2 id="contact">Contact Us</h2>
    <p style={{maxWidth: '40rem', marginBottom: '2rem'}}>
      <b className="lg">Have something to say?</b><br/>
      We'd love to hear from you! Whether you have a question about our products, want to discuss a custom commission, or need assistance with an order, we're here to help!
    </p>
    <Container fluid style={{
        backgroundImage: 'url(/images/contact.jpg)',
        height: '24rem',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}><Row style={{height: '100%', alignItems: 'center'}}>
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

export default Contact;
