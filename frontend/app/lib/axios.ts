import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        if (typeof window !== "undefined") {
          // 🔥 Preserve original storage
          if (localStorage.getItem("accessToken")) {
            localStorage.setItem("accessToken", res.data.accessToken);
          } else {
            sessionStorage.setItem("accessToken", res.data.accessToken);
          }
        }

        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch {
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          sessionStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
