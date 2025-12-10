import axiosInstance from "./axiosConfig";

export const getAppointments = async () => {
  // Récupérer le cookie CSRF avant la requête
  await axiosInstance.get("/sanctum/csrf-cookie");
  return axiosInstance.get("/api/appointments");
};

export const createAppointment = async (data) => {
  await axiosInstance.get("/sanctum/csrf-cookie");
  return axiosInstance.post("/api/appointments", data);
};

export const cancelAppointment = (appointmentId) => {
  return axiosInstance.delete(`/api/appointments/${appointmentId}`);
};