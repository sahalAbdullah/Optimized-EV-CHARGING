import axios from 'axios';
const AIP_KEY = 'AIzaSyBXrm3HF-ZkHDamq1U6FS4JHthRmb9pSBI';
async function authenticate(
  mode: string,
  email: string,
  password: string,
): Promise<string> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${AIP_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  console.log('Reponse : ', response.data.localId);
  const token = response.data.localId;
  return token;
}
export async function createUser(
  email: string,
  password: string,
): Promise<string> {
  //  const token = await authenticate('signUp', email, password); //AnotherSimple Way
  return authenticate('signUp', email, password);
}
export async function login(email: string, password: string): Promise<string> {
  return authenticate('signInWithPassword', email, password);
  //Automatically send the token with it
}
