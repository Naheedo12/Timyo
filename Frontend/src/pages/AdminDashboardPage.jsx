import React, { useState, useEffect } from "react";
import { getAllAppointments, updateAppointmentStatus, getAllUsers } from "../api/adminService";

const AdminDashboardPage = ({ user, onLogout }) => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("appointments"); // "appointments" ou "users"

  const fetchAppointments = async () => {
    try {
      const response = await getAllAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await updateAppointmentStatus(appointmentId, status);
      fetchAppointments(); // Recharger la liste
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-700">
                Dashboard Admin
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
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-6 py-3 font-medium ${
                activeTab === "appointments"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Rendez-vous ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-medium ${
                activeTab === "users"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Utilisateurs ({users.length})
            </button>
          </div>

          <div className="p-6">
            {activeTab === "appointments" ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tous les Rendez-vous</h2>
                {appointments.length === 0 ? (
                  <p className="text-gray-500">Aucun rendez-vous trouvé</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Utilisateur</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Heure</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Statut</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((appointment) => (
                          <tr key={appointment.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                              {appointment.user?.name || "Utilisateur supprimé"}
                            </td>
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
                              {appointment.status === 'pending' ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleStatusChange(appointment.id, 'approved')}
                                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                                  >
                                    Approuver
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(appointment.id, 'rejected')}
                                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                  >
                                    Rejeter
                                  </button>
                                </div>
                              ) : (
                                <span className="text-gray-400 text-sm">Traité</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">Tous les Utilisateurs</h2>
                {users.length === 0 ? (
                  <p className="text-gray-500">Aucun utilisateur trouvé</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-2 text-left">Nom</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">Rôle</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                              <span className={`px-2 py-1 rounded text-sm ${
                                user.role === 'admin' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;