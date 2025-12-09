import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { getUser } from "./api/authService";

function App() {
  const [user, setUser] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser().catch(() => null);
      setUser(res ? res.data : null);
    };
    fetchUser();
  }, []);

  // Si user connecté = afficher dashboard
  if (user) return <Dashboard user={user} setUser={setUser} />;

  // Sinon = Login ou Register
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      {isRegister ? (
        <RegisterPage goLogin={() => setIsRegister(false)} setUser={setUser} />
      ) : (
        <LoginPage setUser={setUser} goRegister={() => setIsRegister(true)} />
      )}
    </div>
  );
}

export default App;