import axiosInstance from "./axiosConfig";

// CSRF cookie : no /api here
export const getCsrfCookie = () => {
  return axiosInstance.get("/sanctum/csrf-cookie");
};

export const register = async (data) => {
  await getCsrfCookie();
  return axiosInstance.post("/api/register", data);
};

export const login = async (data) => {
  await getCsrfCookie();
  return axiosInstance.post("/api/login", data);
};

export const logout = () => {
  return axiosInstance.post("/api/logout");
};

export const getUser = () => {
  return axiosInstance.get("/api/user");
};
