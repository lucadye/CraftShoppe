import api from './index';

export async function signIn(name, password) {
  const result = await api.POST('/auth/sign-in', {
    name, password,
  }, {
    'Content-Type': 'application/json',
  });
  return result;
}

export async function signOut() {
  const result = await api.POST('/auth/sign-out');
  return result;
}

export async function signUp(name, password) {
  const result = await api.POST('/auth/sign-in', {
    name, password,
  }, {
    'Content-Type': 'application/json',
  });
  return result;
}
