import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true, // 🔥 must for cookies
});

// Response interceptor (auto refresh)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // safety checks
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshCall = originalRequest.url?.includes("/auth/refresh");

    // only retry once, and NEVER retry refresh itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      try {
        // refresh token (cookie-based)
        await api.post("/auth/refresh");

        // retry original request
        return api(originalRequest);
      } catch (refreshError) {
        // refresh failed → user is truly logged out
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };