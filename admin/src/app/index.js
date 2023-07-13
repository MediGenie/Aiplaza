import AppClient from './AppClient';
import Axios from 'axios';

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5001/apis/a';
} else {
  baseUrl = '/apis/a';
}

// 프로덕션에서 로그 제거
if (process.env.NODE_ENV === 'production') {
  console.log = () => { };
  console.error = () => { };
  console.warn = () => { };
  console.debug = () => { };
  console.info = () => { };
}

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = baseUrl;

export default AppClient;
