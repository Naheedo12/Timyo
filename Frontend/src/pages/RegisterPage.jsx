import React, { useState } from "react";
import { register } from "../api/authService";

const RegisterPage = ({ goLogin, setUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      // Connecter automatiquement l'utilisateur
      setUser(response.data.user);
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form className="bg-pink-100 p-8 rounded-lg shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-pink-700 text-center">
          Register
        </h2>
        <input
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
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
        <input
          type="password"
          placeholder="Confirmer mot de passe"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          onClick={handleRegister}
          className="bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition"
        >
          S'inscrire
        </button>
        {message && (
          <p className="text-pink-700 text-sm text-center">{message}</p>
        )}

        <p className="text-sm text-center text-pink-700 mt-2">
          Déjà un compte ?{" "}
          <span
            className="font-bold cursor-pointer hover:underline"
            onClick={goLogin}
          >
            Se connecter
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;