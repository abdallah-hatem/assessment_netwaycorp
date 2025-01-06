import type { AxiosRequestConfig, Method } from "axios";

import axios from "axios";

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config?.data;
  },
  (error) => {
    let errorMessage = "Oops! Something went wrong. Please try again later.";

    console.log(error);

    console.dir(error);

    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  }
);

export type Response<T = any> = {
  status: boolean;
  message: string;
  result: T;
};

export type MyResponse<T = any> = Promise<Response<T>>;

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = <T = any>(method: Lowercase<Method>, url: string, data?: any, config?: AxiosRequestConfig): MyResponse<T> => {
  const configPost = {
    headers: {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    ...config,
  };

  if (method === "post") {
    return axiosInstance.post(url, data, configPost);
  } else if (method === "put") {
    return axiosInstance.put(url, data, configPost);
  } else if (method === "delete") {
    return axiosInstance.delete(url, configPost);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...configPost,
    });
  }
};
