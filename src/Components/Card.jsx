import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

export default function ({title, src: imgSrc, children, button: Btn, singleElement, contact}) {
  if (singleElement) {
    return (
      <Card className="justify-content-center single-element">
        {children}
      </Card>
    );
  }
  return (
    <Card className={contact ? 'card-fluid mx-auto' : ''}>
      {imgSrc ? <Card.Img variant="top" src={imgSrc} /> : ''}
      <Card.Body>
        {title ? <Card.Title as='h4'>{title}</Card.Title> : ''}
        {typeof children === 'string' ? <Card.Text>{children}</Card.Text> : children}
        {Btn ? <Btn/> : ''}
      </Card.Body>
    </Card>
  );
}
