import React from "react";
import { logout } from "../api/authService";

const Dashboard = ({ user, setUser }) => {
  const handleLogout = () => {
    logout().then(() => setUser(null)); // après logout, on réinitialise l'état user
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <div className="bg-pink-100 p-8 rounded-lg shadow-md w-80 flex flex-col gap-4 text-center">
        <h2 className="text-2xl font-bold text-pink-700">Bienvenue, {user.name} !</h2>
        <p className="text-pink-700">Email : {user.email}</p>
        <p className="text-pink-700">Rôle : {user.role}</p>

        <button
          onClick={handleLogout}
          className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
