import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login'; // Assurez-vous que le chemin est correct

function App() {
  return (
    <Router>
      <div className="App">
        {/* Définir les routes */}
        <Routes>
          {/* Rediriger automatiquement vers /login */}
          <Route path="/" element={<Navigate to="/login" />} /> 

          {/* Route pour la page de login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

