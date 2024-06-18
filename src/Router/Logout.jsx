import { useDispatch } from 'react-redux';
import { signOut as signOutStore } from '../store/userSlice';
import { signOut as signOutApi } from '../api/auth';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function Logout() {
  const dispatch = useDispatch();
  dispatch(signOutStore());

  signOutApi();

  return (
    <Container fluid>
    <h2 style={{width: '100%'}} id="contact">Logout</h2>
      <Container className="d-flex flex-column" style={{maxWidth: '32rem'}}>
        <p className="xx-lg" style={{textAlign: 'center'}}>Successfully signed out!</p>
        <Container fluid className="d-flex">
          <Button href="/" className="btn-lg mx-auto" style={{width: 'max-content'}}>Back to Home</Button>
        </Container>
      </Container>
    </Container>
  );
}

export default Logout;
