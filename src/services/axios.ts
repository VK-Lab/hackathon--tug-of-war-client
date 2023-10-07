import axios from 'axios';
import { rootAPI } from './api';

const customAxios = axios.create({ baseURL: rootAPI });
const fetcher = (url: string) => {
  return customAxios.get(url).then((res: any) => res.data);
};
const fetcherWithArray = ([url, query]: [string, string]) => {
  return customAxios.get(`${url}?${query}`).then((res: any) => res.data);
};

const controller = new AbortController();
const signal = controller.signal;

export { signal, fetcherWithArray, fetcher, controller, customAxios as axios };

export default customAxios;
