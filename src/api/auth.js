import api from './index';
import { extractQueryParams } from '../helpers';

export async function signIn(name, password) {
  return await api.POST('/auth/sign-in', {
    name, password,
  });
}

export async function signOut() {
  return await api.POST('/auth/sign-out');
}

export async function signUp(name, password) {
  const result = await api.POST('/auth/sign-up', {
    name, password, admin: false,
  }, undefined, true);
  if (result.ok) return await api.parse(result);
  if (result.status === 400) return result.text();
  return result;
}

export async function googleAuth() {
  const endpoint = '/auth/google/callback';
  const params = extractQueryParams(window.location.href);
  return await api.GET(endpoint + params);;
}
