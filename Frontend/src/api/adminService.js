import axiosInstance from "./axiosConfig";

export const getAllAppointments = () => {
  return axiosInstance.get("/api/admin/appointments");
};

export const updateAppointmentStatus = (appointmentId, status) => {
  return axiosInstance.put(`/api/admin/appointments/${appointmentId}/status`, { status });
};

export const getAllUsers = () => {
  return axiosInstance.get("/api/admin/users");
};