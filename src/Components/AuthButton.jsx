import { useSelector } from 'react-redux';
import NavButton from './NavButton';

function AuthButton() {
  return useSelector((state) => state.user.signedIn) ? (<>
    <NavButton href="/cart">Cart</NavButton>
    <NavButton href="/logout">Logout</NavButton>
  </>) : (<>
    <NavButton href="/login">Login</NavButton>
    <NavButton solid href="/sign-up">Sign Up</NavButton>
  </>);
}

export default AuthButton;
