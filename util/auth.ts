import axios from 'axios';
import {FIREBASE_CONFIG} from '../config';
async function authenticate(
  mode: string,
  email: string,
  password: string,
): Promise<string> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${FIREBASE_CONFIG.apiKey}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.localId;
  return token;
}
export async function createUser(
  email: string,
  password: string,
): Promise<string> {
  return authenticate('signUp', email, password);
}
export async function login(email: string, password: string): Promise<string> {
  return authenticate('signInWithPassword', email, password);
}
