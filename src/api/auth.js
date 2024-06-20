import api from './index';

export async function signIn(name, password) {
  return await api.POST('/auth/sign-in', {
    name, password,
  }, {
    'Content-Type': 'application/json',
  });
}

export async function signOut() {
  return await api.POST('/auth/sign-out');
}

export async function signUp(name, password) {
  return await api.POST('/auth/sign-in', {
    name, password,
  }, {
    'Content-Type': 'application/json',
  });
}
