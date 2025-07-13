import axios from "axios";
import { toast } from "sonner";
import { baseURL } from "../../config";
import { refreshAccessToken } from "../api/auth.api";
import {
  callGlobalLogout,
  getAccessToken,
  getRefreshToken,
  removeSessionsData,
  saveAccessToken,
} from "./authUtils";

const api = axios.create({
  baseURL: `${baseURL}/api/`,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        removeSessionsData();
        callGlobalLogout();
        return Promise.reject(error);
      }

      try {
        const data = await refreshAccessToken(refreshToken);
        saveAccessToken(data.access);
        api.defaults.headers.common.Authorization = `Bearer ${data.access}`;
        processQueue(null, data.access);
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        processQueue(err, null);
        removeSessionsData();
        callGlobalLogout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.toJSON().message === "NetworkError") {
      toast.error("حدث خطأ أثناء الاتصال بالخادم");
    }

    return Promise.reject(error);
  },
);

export default api;

export const classifyAxiosError = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return { type: "unknown", message: "حدث خطأ غير معروف." };
  }

  if (error.response) {
    return {
      type: "api",
      status: error.response.status,
      data: error.response.data.detail,
    };
  }

  if (error.request) {
    return {
      type: "network",
      message: "خطأ في الشبكة: لا توجد استجابة من الخادم.",
    };
  }

  return { type: "axios", message: error.message };
};
