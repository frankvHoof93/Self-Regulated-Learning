import { AppConfig } from '../utils/interfaces/AppConfig';

const dev: AppConfig = {
  ApiBaseUrl: 'http://localhost:5000',
}

const prod: AppConfig = {
  ApiBaseUrl: 'http://localhost:5000',
}

export const getEnvVars = (): AppConfig => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('dev', dev);
    return dev;
  }
  else {
    console.log('prod', prod);
    return prod;
  };
}
