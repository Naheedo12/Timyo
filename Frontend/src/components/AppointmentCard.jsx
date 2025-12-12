import React from "react";
import { cancelAppointment } from "../api/appointmentService";

const AppointmentCard = ({ appointment, onAppointmentCanceled }) => {
  const handleCancel = () => {
    if (window.confirm("Voulez-vous annuler ce rendez-vous ?")) {
      cancelAppointment(appointment.id)
        .then(() => onAppointmentCanceled(appointment.id))
        .catch(() => alert("Erreur lors de l'annulation"));
    }
  };

  const formatDate = (date) => new Date(date).toLocaleDateString("fr-FR");

  const statusText = {
    pending: "En attente",
    approved: "Approuvé",
    rejected: "Rejeté",
  }[appointment.status] || appointment.status;

  return (
    <div className="p-4 border rounded shadow-sm bg-white mb-2">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-medium">{formatDate(appointment.date)}</div>
          <div className="text-sm text-gray-600">{appointment.time}</div>
        </div>
        <div className="text-sm font-medium">{statusText}</div>
      </div>

      <button
        onClick={handleCancel}
        className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
      >
        Annuler
      </button>
    </div>
  );
};

export default AppointmentCard;
