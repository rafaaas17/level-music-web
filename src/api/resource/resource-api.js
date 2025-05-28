import axios from 'axios'
import { baseURL } from '../../shared/helpers';

export const resourceApi = axios.create({
  baseURL: `${baseURL}/resources`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});