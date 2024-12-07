import axios from "axios";

export const createBaseUrl = (url: string, useInterceptor: any) => {
  let tokenInterceptor;
  let authInterceptor;
  let errorInterceptor;
  const instance = axios.create({
    baseURL: `${url}`,
    headers: { Pragma: "no-cache" },
  });

  instance.interceptors.request.use(tokenInterceptor);
  instance.interceptors.response.use(response => response, authInterceptor);
  if (useInterceptor) {
    instance.interceptors.response.use(response => response, errorInterceptor);
  }

  return instance;
};

export const httpCommon = (url: string) =>
  axios.create({
    baseURL: url,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  });
