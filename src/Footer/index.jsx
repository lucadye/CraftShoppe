import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (<footer>
    <Container fluid className="bg-body-tertiary d-flex align-items-center flex-column">
      <Navbar className="justify-content-center">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/#about">About</Nav.Link>
          <Nav.Link href="/#contact">Contact</Nav.Link>
        </Nav>
      </Navbar>
      <hr/>
      <a className="sneaky-link" href="https://www.github.com/lucadye/">Crafted by Dyenamite</a>
    </Container>
  </footer>);
}

export default Footer;
