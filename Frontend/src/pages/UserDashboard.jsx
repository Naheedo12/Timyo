import React, { useState } from "react";
import { logout } from "../api/authService";
import AppointmentsListPage from "./AppointmentsListPage";
import CreateAppointmentPage from "./CreateAppointmentPage";

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

  // Rendu conditionnel selon la page actuelle
  if (currentPage === "create") {
    return (
      <CreateAppointmentPage
        onAppointmentCreated={handleAppointmentCreated}
        onBack={goToListPage}
      />
    );
  }

  return (
    <AppointmentsListPage
      user={user}
      onCreateNew={goToCreatePage}
      onLogout={handleLogout}
    />
  );
};

export default UserDashboard;
