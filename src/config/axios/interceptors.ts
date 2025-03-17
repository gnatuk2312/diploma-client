import { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

export const setAuthorizationHeaderRequestInterceptor = (
  config: InternalAxiosRequestConfig<any>
): InternalAxiosRequestConfig<any> => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export const transformResponseInterceptor = (response: AxiosResponse): any => {
  return response.data;
};

export const transformErrorInterceptor = (error: AxiosError): any => {
  throw error.response?.data;
};
