import React, { useState } from "react";
import { createAppointment } from "../api/appointmentService";

const UserCreateAppointmentPage = ({ user, onAppointmentCreated, onBack, onLogout }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await createAppointment({ date, time });
      onAppointmentCreated(response.data);
      onBack();
    } catch (error) {
      setError(error.response?.data?.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-pink-700">
                Nouveau Rendez-vous
              </h1>
              <p className="text-gray-600">Bonjour {user.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-6 border-b">
            <button
              onClick={onBack}
              className="text-pink-600 hover:text-pink-800 transition"
            >
              ← Retour à mes rendez-vous
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">
                    {error}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition"
                  >
                    Créer le rendez-vous
                  </button>
                  <button
                    type="button"
                    onClick={onBack}
                    className="bg-gray-300 text-gray-700 py-2 px-6 rounded hover:bg-gray-400 transition"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCreateAppointmentPage;