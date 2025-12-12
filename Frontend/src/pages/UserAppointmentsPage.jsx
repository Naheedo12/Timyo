import React, { useState, useEffect } from "react";
import { getAppointments, cancelAppointment } from "../api/appointmentService";

const UserAppointmentsPage = ({ user, onCreateNew, onLogout }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      return;
    }

    try {
      await cancelAppointment(appointmentId);
      setAppointments(appointments.filter(apt => apt.id !== appointmentId));
    } catch (error) {
      alert("Erreur lors de l'annulation");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-pink-700">
                Mes Rendez-vous
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
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Mes Rendez-vous ({appointments.length})
            </h2>
            <button
              onClick={onCreateNew}
              className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
            >
              + Nouveau Rendez-vous
            </button>
          </div>

          <div className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Aucun rendez-vous trouvé</p>
                <button
                  onClick={onCreateNew}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
                >
                  Créer votre premier rendez-vous
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Heure</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => {
                      const isPastDate = new Date(appointment.date) < new Date();
                      const canCancel = !isPastDate && appointment.status === 'pending';
                      
                      return (
                        <tr key={appointment.id} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-2">
                            {new Date(appointment.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {appointment.time}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <span className={`px-2 py-1 rounded text-sm ${
                              appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              appointment.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {appointment.status === 'pending' ? 'En attente' :
                               appointment.status === 'approved' ? 'Approuvé' : 'Rejeté'}
                            </span>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {canCancel ? (
                              <button
                                onClick={() => handleCancel(appointment.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                              >
                                Annuler
                              </button>
                            ) : (
                              <span className="text-gray-400 text-sm">
                                {isPastDate ? 'Passé' : 'Non modifiable'}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentsPage;