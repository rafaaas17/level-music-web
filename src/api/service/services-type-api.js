import axios from 'axios';
import { baseURL } from '../../shared/helpers';

export const serviceTypeApi = axios.create({
  baseURL: `${baseURL}/service-types`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});