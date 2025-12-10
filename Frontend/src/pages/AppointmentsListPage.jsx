import React, { useState, useEffect } from "react";
import { getAppointments } from "../api/appointmentService";
import AppointmentCard from "../components/AppointmentCard";

const AppointmentsListPage = ({ user, onCreateNew, onLogout }) => {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments
  useEffect(() => {
    getAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => setAppointments([]));
  }, []);

  const handleAppointmentCanceled = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4 flex justify-center">
      <div className="w-full max-w-md">

        <div className="bg-white p-4 rounded border mb-4">
          <h1 className="text-xl font-bold text-pink-700">User Dashboard</h1>
          <p className="text-gray-600">Bonjour {user.name}</p>
          <button
            onClick={onLogout}
            className="mt-2 bg-red-400 text-white px-3 py-1 rounded w-full hover:bg-red-500"
          >
            Se déconnecter
          </button>
        </div>

        <div className="bg-white p-4 rounded border mb-4 flex justify-between items-center">
          <span>Rendez-vous ({appointments.length})</span>
          <button
            onClick={onCreateNew}
            className="bg-pink-400 text-white px-3 py-1 rounded hover:bg-pink-500"
          >
            + Nouveau
          </button>
        </div>

        {/* Appointments list */}
        <div className="bg-white p-4 rounded border space-y-2">
          {appointments.map((apt) => (
            <AppointmentCard
              key={apt.id}
              appointment={apt}
              onAppointmentCanceled={handleAppointmentCanceled}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsListPage;