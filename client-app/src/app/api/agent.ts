import { Activity } from './../layout/models/activity';
import axios from 'axios';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return await Promise.reject(error);
  }
});

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
    create: (activity: Activity) =>
      requests.post<void>('/activities', activity),
    update: (activity: Activity) =>
      requests.put<void>(`/activities/${activity.id}`, activity),
    deleste: (id: string) => requests.del<void>(`/activities/${id}`),
  },
};

export default agent;
