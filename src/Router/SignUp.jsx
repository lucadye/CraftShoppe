import { signUp } from '../api/auth';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';

function SignUp() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const setUser = payload => dispatch(setUserData(payload));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user.signedIn) return <Navigate to="/"/>;
  
  async function onSubmit(e) {
    e.preventDefault();
    const results = await signUp(email, password);
    console.log(results);
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
      <h2 id="contact">Sign Up</h2>
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
          >Already have an account? <Link to="/login">Log in here!</Link>
        </p>

      </Form>
    </Container>
  );
}

export default SignUp;
