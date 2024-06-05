import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';

export default function ({title, src: imgSrc, children, button: Btn, singleElement, contact, placeholder}) {
  if (placeholder) {
    return (
      <Card className={contact ? 'mx-auto' : ''}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder.Button variant="primary" xs={6} />
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
        {typeof children === 'string' ? <Card.Text>{children}</Card.Text> : children}
        {Btn ? <Btn/> : ''}
      </Card.Body>
    </Card>
  );
}
