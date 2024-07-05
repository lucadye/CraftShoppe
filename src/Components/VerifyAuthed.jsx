import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function VerifyAuthed({children}) {
  const signedIn = useSelector(state => state.user.signedIn);
  if (signedIn) return children;
  else return <Navigate to="/login"/>;
}
