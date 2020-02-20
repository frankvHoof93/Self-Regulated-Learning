import axios from 'axios';
import { getEnvVars } from '../../configuration/environment';
const config = getEnvVars();

export const Axios = axios.create({
  baseURL: config.ApiBaseUrl,
  timeout: 1000,
});