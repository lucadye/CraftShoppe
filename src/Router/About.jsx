import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
  return (<Container fluid style={{marginBottom: '4rem'}}>
    <h2 id="about">About Us</h2>
    <Container fluid>
      <Row>
        <Col sm className="d-flex flex-column">
          <p className="lg">
            We're a bunch of craft-obsessed friends who believe that creativity is better when shared. Our love for arts and crafts brought us together, and now we're thrilled to share our passion with you!
          </p>
          <img className="about" src="/images/about1.jpg" alt="Paint brushes in cups" />
        </Col>
        <Col sm className="d-flex flex-column flip-on-mobile">
          <img className="about" src="/images/about2.jpg" alt="Paint brushes in front of a painting" />
          <p className="lg">
            Whether you're looking for a special gift or a charming addition to your space, we've got something for everyone. Our mission is to share our creative spirit and help you find that perfect piece that speaks to your artistic soul.
          </p>
        </Col>
      </Row>
      <Row style={{marginTop: '2rem'}}>
        <Col>
          <p className="x-lg text-center" style={{width: '100%'}}>
            Join us on this colorful journey, and let's make something beautiful together!
          </p>
          <b className="xx-lg text-center d-block" style={{width: '100%'}}>
            Happy crafting!
          </b>
        </Col>
      </Row>
    </Container>
  </Container>);
}

export default About;
