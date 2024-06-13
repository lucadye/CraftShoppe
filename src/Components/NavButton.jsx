import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function NavButton({href, children}) {
  const [state, setState] = useState();
  const className = ({ isActive, isPending }) => {
    let newState = isPending ? 'pending' : isActive ? 'active' : '';
    if (newState !== state) setState(newState);
    return newState;
  }
  return (<Nav.Link href={href}>
    <NavLink to={href} className={className}>
      <Button variant={state === 'active' ? 'dark' : 'outline-dark'}>
        {children}
      </Button>
    </NavLink>
  </Nav.Link>);
}

export default NavButton;
