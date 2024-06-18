import { useState } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom';

function NavLink ({href, children}) {
  const [state, setState] = useState();
  const className = ({ isActive, isPending }) => {
    let newState = isActive ? 'active' : '';
    if (newState !== state) setState(newState);
    return `nav-link text-link ${newState}`;
  }
  return (
    <RouterNavLink to={href} className={className} disabled={state !== 'active'}>
      {children}
    </RouterNavLink>
  );
}

export default NavLink;
