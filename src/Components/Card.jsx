import BCard from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';

function Card({title, src: imgSrc, children, button: Btn, singleElement, contact, placeholder, ...props}) {
  if (placeholder) {
    return (
      <BCard className={contact ? 'mx-auto contact' : ''} {...props}>
        <BCard.Body>
          <Container fluid className="border rounded d-flex justify-content-center align-items-center" style={{height: "12rem"}}>
            <Spinner variant="secondary" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Container>
          <Placeholder as={BCard.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={BCard.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Container className="d-flex justify-content-left gap-4">
            <Placeholder.Button variant="primary" xs={5} />
          </Container>
        </BCard.Body>
      </BCard>
    );
  }
  if (singleElement) {
    return (
      <BCard className="justify-content-center single-element" {...props}>
        {children}
      </BCard>
    );
  }
  return (
    <BCard className={contact ? 'mx-auto contact' : ''} {...props}>
      {imgSrc ? <BCard.Img variant="top" src={imgSrc} alt={title}/> : ''}
      <BCard.Body>
        {title ? <BCard.Title as='h4'>{title}</BCard.Title> : ''}
        <BCard.Text>{children}</BCard.Text>
        {Btn ? <Btn/> : ''}
      </BCard.Body>
    </BCard>
  );
}

export default Card;
