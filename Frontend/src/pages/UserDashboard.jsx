import React, { useState } from "react";
import { logout } from "../api/authService";
import UserAppointmentsPage from "./UserAppointmentsPage";
import UserCreateAppointmentPage from "./UserCreateAppointmentPage";
import AdminDashboardPage from "./AdminDashboardPage";

const UserDashboard = ({ user, setUser }) => {
  const [currentPage, setCurrentPage] = useState("list"); // "list" ou "create"
  const [appointments, setAppointments] = useState([]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleAppointmentCreated = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
  };

  const goToCreatePage = () => {
    setCurrentPage("create");
  };

  const goToListPage = () => {
    setCurrentPage("list");
  };

  if (user.role === "admin") {
    return <AdminDashboardPage user={user} onLogout={handleLogout} />;
  }

  if (currentPage === "create") {
    return (
      <UserCreateAppointmentPage
        user={user}
        onAppointmentCreated={handleAppointmentCreated}
        onBack={goToListPage}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <UserAppointmentsPage
      user={user}
      onCreateNew={goToCreatePage}
      onLogout={handleLogout}
    />
  );
};

export default UserDashboard;