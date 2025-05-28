import axios from 'axios';
import { baseURL } from '../../shared/helpers';

export const serviceApi = axios.create({
  baseURL: `${baseURL}/services`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});