import React from "react";
import { logout } from "../api/authService";

const Logout = ({ setUser }) => {
  const handleLogout = async () => {
    await logout();
    setUser(null); // vide l user connecté dans App
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;
