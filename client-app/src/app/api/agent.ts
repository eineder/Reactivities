import { Activity, ActivityFormValues } from '../../app/models/activity';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { store } from '../stores/store';
import { User, UserFormValues } from '../models/user';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }

        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }

        if (data.errors) {
          const modalStateErrors = [];

          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }

          throw modalStateErrors.flat();
        }

        toast.error('bad request');
        break;

      case 401:
        toast.error('unauthorised');
        break;

      case 404:
        history.push('/not-found');
        break;

      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then((p) => p.data),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then((p) => p.data),
  del: <T>(url: string) => axios.delete<T>(url).then((p) => p.data),
  put: <T>(url: string, body: {}) =>
    axios.put<T>(url, body).then((p) => p.data),
};

const agent = {
  Activities: {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) =>
      requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) =>
      requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {}),
  },
  Account: {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) =>
      requests.post<User>('/account/login', user),
    register: (user: UserFormValues) =>
      requests.post<User>('/account/register', user),
  },
};

export default agent;
