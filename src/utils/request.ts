import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'
import type { ResponseData } from './interface'

// axios.defaults.withCredentials = true;

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 3000
});

http.interceptors.request.use(config => {
  const user = useUserStore();
  if (user.token) {
    config.headers.Authentication = user.token;
  }
  return config;
});

http.interceptors.response.use(
  res => {
    if (res.data.code === 401) {
      console.log("登录失效");
      return Promise.reject(res.data.msg);
    }
    return res.data;
  },
  (err: AxiosError) => {
    console.error(err);
    return Promise.reject(err);
  }
);

const instance = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>{
    return http.get(url, config);
  },
  post<T = unknown>(url: string, data?: AxiosRequestConfig | null, config?: AxiosRequestConfig<AxiosRequestConfig>): Promise<ResponseData<T>>{
    return http.post(url, data, config);
  },
  put<T = unknown>(url: string, data?: AxiosRequestConfig | null, config?: AxiosRequestConfig<AxiosRequestConfig>): Promise<ResponseData<T>>{
    return http.put(url, data, config);
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>>{
    return http.delete(url, config);
  },
};

export { instance, http };
