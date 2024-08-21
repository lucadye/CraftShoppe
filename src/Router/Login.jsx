import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUserData } from '../store/userSlice';
import { signIn } from '../api/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Login() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const setUser = payload => dispatch(setUserData(payload));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [failed, setFailed] = useState(false);
  
  if (user.signedIn) return <Navigate to="/"/>;

  async function onSubmit(e) {
    e.preventDefault();
    const results = await signIn(email, password);
    if (results.status === 401) {
      setEmail('');
      setPassword('');
      return setFailed(true);
    };
    setUser({
      ...results,
      signedIn: true,
    })
  }

  function onEmailChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  return (
      <Container fluid>
      <h2>Login</h2>
      {failed ? (
        <Container fluid className="d-flex justify-content-center">
          <Alert dismissible variant="light" style={{textAlign: 'center'}}>
            Incorrect username or password.<br/>Please try again.
          </Alert>
        </Container>
      ) : ''}
      <Form className="d-flex flex-column mx-auto" style={{marginTop: 'auto', maxWidth: "32rem"}} onSubmit={onSubmit}>

        <Form.Group
          style={{marginTop: '2rem'}}>
          <Form.Label>
            Email address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            aria-label="Email address"
            onChange={onEmailChange}
            value={email}
          />
          <Form.Text
            className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          style={{marginTop: '2rem'}}>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            aria-label="Password"
            onChange={onPasswordChange}
            value={password}
          />
        </Form.Group>

        <Button
          style={{marginTop: '2rem'}}
          disabled={!email || !password}
          type="submit"
          >Login
        </Button>

        <p className="text-muted"
          style={{marginTop: '2rem'}}
          >Don't have an account? <Link to="/sign-up">Sign up here!</Link>
        </p>

        <p className="text-muted" style={{marginTop: '1rem'}}>
          Prefer to sign in another way? <Link to="/auth/google">Sign in with Google!</Link>
        </p>

      </Form>

    </Container>
  );
}

export default Login;
