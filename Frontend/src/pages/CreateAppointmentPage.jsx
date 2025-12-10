import React, { useState } from "react";
import { createAppointment } from "../api/appointmentService";

const CreateAppointmentPage = ({ onAppointmentCreated, onBack }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await createAppointment({ date, time });
      onAppointmentCreated(res.data.appointment);
      onBack(); // go back after creation
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded border w-full max-w-md">
        <h1 className="text-xl font-bold text-pink-700 mb-4">Nouveau Rendez-vous</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-pink-500 text-white p-2 rounded">
              Créer
            </button>
            <button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded"
            >
              Retour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;