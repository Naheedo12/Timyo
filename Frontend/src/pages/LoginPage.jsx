import React, { useState } from "react";
import { login, getUser } from "../api/authService";

const LoginPage = ({ setUser, goRegister }) => {
  // ajouter goRegister
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ email, password });
    const res = await getUser();
    setUser(res.data);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form className="bg-pink-100 p-8 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-pink-700 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition"
        >
          Se connecter
        </button>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <p className="text-sm text-center text-pink-700 mt-2">
          Pas de compte ?{" "}
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={goRegister}
          >
            S'inscrire
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
