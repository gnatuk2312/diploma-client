import axios from "axios";

import {
  transformErrorInterceptor,
  transformResponseInterceptor,
} from "./interceptors";

console.log("process.env.API_URL >>", process.env.NEXT_PUBLIC_API_URL);

const baseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

baseAxiosInstance.interceptors.response.use(
  transformResponseInterceptor,
  transformErrorInterceptor
);

export default baseAxiosInstance;
