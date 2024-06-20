import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signOut as signOutStore } from '../store/userSlice';
import { signOut as signOutApi } from '../api/auth';

function Logout() {
  const dispatch = useDispatch();
  dispatch(signOutStore());

  signOutApi();

  return (
    <Navigate to="/"/>
  );
}

export default Logout;
