import api from './index';

export async function signIn(name, password) {
  return await api.POST('/auth/sign-in', {
    name, password,
  });
}

export async function signOut() {
  return await api.POST('/auth/sign-out');
}

export async function signUp(name, password) {
  return await api.POST('/auth/sign-up', {
    name, password, admin: false,
  });
}
