import axios from 'axios';
import { baseURL } from '../../shared/helpers';

export const workerTypeApi = axios.create({
  baseURL: `${baseURL}/worker-type`,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true'
  // }
});
