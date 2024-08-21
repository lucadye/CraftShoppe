import { signUp } from '../api/auth';
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';
import { validEmail, validPassword, passwordRequirements } from '../helpers';

function SignUp() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const setUser = payload => dispatch(setUserData(payload));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  useEffect(() => setEmailIsValid(validEmail(email)), [email]);
  useEffect(() => setPasswordIsValid(validPassword(password)), [password]);

  if (user.signedIn) return <Navigate to="/"/>;
  
  async function onSubmit(e) {
    e.preventDefault();
    const results = await signUp(email, password);
    if (results === 'Invalid password') {
      setPasswordMessage('Password is invalid.')
      return setPasswordIsValid(false);
    }
    if (results === 'Name already in use') {
      setEmailMessage('Email already in use.');
      return setEmailIsValid(false);
    }
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
      <h2>Sign Up</h2>
      <Form noValidate className="d-flex flex-column mx-auto" style={{marginTop: 'auto', maxWidth: "32rem"}} onSubmit={onSubmit}>

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
            isValid={emailIsValid}
            isInvalid={!emailIsValid && email !== ''}
          />
          <Form.Text 
            className="text-muted">
            We'll never share your email with anyone else.
            {emailMessage ? <><br/>{emailMessage}</> : ''}
          </Form.Text>
        </Form.Group>

        <Form.Group
          style={{marginTop: '2rem'}}>
          <Form.Label>
            Password
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Password"
            aria-label="Password"
            onChange={onPasswordChange}
            isValid={passwordIsValid}
            isInvalid={!passwordIsValid && password !== ''}
          />
          <Form.Text 
            className="text-muted">
            {passwordRequirements(password) || passwordMessage}
          </Form.Text>
        </Form.Group>

        <Button
          style={{marginTop: '2rem'}}
          disabled={!email || !password}
          type="submit"
          >Sign Up
        </Button>
        
        <p className="text-muted"
          style={{marginTop: '2rem'}}
          >Already have an account? <Link to="/login">Log in here!</Link>
        </p>

        <p className="text-muted" style={{marginTop: '1rem'}}>
          Prefer to sign up another way? <Link to="/auth/google">Sign up with Google!</Link>
        </p>

      </Form>
    </Container>
  );
}

export default SignUp;
