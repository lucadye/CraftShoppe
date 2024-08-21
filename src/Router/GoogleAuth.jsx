import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUserData } from '../store/userSlice';

import { googleAuth } from '../api/auth';

export function GoogleAuth () {
  window.location.href = process.env.REACT_APP_API_URL+'/auth/google';
  return null;
};

export function GoogleAuthCallback () {
  const [done, setDone] = useState(false);

  const dispatch = useDispatch();
  const setUser = payload => dispatch(setUserData(payload));

  useEffect(() => {(async () => {
    if (done) return;
    const userData = await googleAuth();
    setUser({
      ...userData,
      signedIn: true,
    });
    setDone(true);
  })()});

  if (done) window.location.href = process.env.REACT_APP_CLIENT_URL;
  return null;
}
