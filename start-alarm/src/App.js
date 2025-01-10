import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login'; // Assurez-vous que le chemin est correct
import Register from './register'; // Assurez-vous que le chemin est correct
import Accueil from './accueil'; // Assurez-vous que le chemin est correct
import Simulateur from './simulateur';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Définir les routes */}
        <Routes>
          {/* Rediriger automatiquement vers /accueil */}
          <Route path="/" element={<Navigate to="/accueil" />} /> 
          {/* Route pour la page de login */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/simulateur" element={<Simulateur />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

