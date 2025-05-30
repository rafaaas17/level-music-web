import axios from 'axios'
import { baseURL } from '../../shared/helpers';

export const firebaseAuthApi = axios.create({
  baseURL: `${baseURL}/firebase-auth`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});