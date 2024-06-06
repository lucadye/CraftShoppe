import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';

export default function ({title, src: imgSrc, children, button: Btn, singleElement, contact, placeholder}) {
  if (placeholder) {
    return (
      <Card className={contact ? 'mx-auto' : ''}>
        <Card.Body>
          <Container fluid className="border rounded d-flex justify-content-center align-items-center" style={{height: "12rem"}}>
            <Spinner variant="secondary" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Container className="d-flex justify-content-left gap-4">
            <Placeholder.Button variant="primary" xs={5} />
            <Placeholder.Button variant="primary" xs={5} />
          </Container>
        </Card.Body>
      </Card>
    );
  }
  if (singleElement) {
    return (
      <Card className="justify-content-center single-element">
        {children}
      </Card>
    );
  }
  return (
    <Card className={contact ? 'mx-auto' : ''}>
      {imgSrc ? <Card.Img variant="top" src={imgSrc} /> : ''}
      <Card.Body>
        {title ? <Card.Title as='h4'>{title}</Card.Title> : ''}
        <Card.Text>{children}</Card.Text>
        {Btn ? <Btn/> : ''}
      </Card.Body>
    </Card>
  );
}
