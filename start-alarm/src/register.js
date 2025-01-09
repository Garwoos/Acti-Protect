import React, { useState } from 'react';
import './register.css'; // Fichier CSS pour styliser la page d'inscription
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, passwordConfirmation: confirmPassword }),
      });

      if (response.ok) {
        setMessage('Inscription réussie');
      } else {
        const errorData = await response.json();
        setMessage(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Erreur: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un Compte</h2>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmez le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="register-logo">
          <img src="/images/LOGO-START-ALARM-Q.png" alt="Logo" />
        </div>
        <button type="submit">S'inscrire</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default Register;