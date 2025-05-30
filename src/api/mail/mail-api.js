import axios from 'axios'
import { baseURL } from '../../shared/helpers';

export const mailApi = axios.create({
  baseURL: `${baseURL}/mail`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});