import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `//localhost:3001`,
  withCredentials: true,
});
