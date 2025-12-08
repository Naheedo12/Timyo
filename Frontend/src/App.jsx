import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 rounded-2xl shadow-xl bg-white">
        <h1 className="text-3xl font-bold text-blue-600">
          Tailwind fonctionne 🎉
        </h1>
        <p className="mt-2 text-gray-700">
          Si tu vois ce texte stylé, Tailwind est bien installé.
        </p>
      </div>
    </div>
  );
}

export default App;