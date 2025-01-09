import React, { useState } from 'react';
import './register.css'; // Fichier CSS pour styliser la page d'inscription
import { motion } from 'framer-motion';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    // Logique pour envoyer les données au backend ou vérifier les données
    console.log('Email:', email);
    console.log('Mot de passe:', password);
  };

  return (
    <div className="register-container">
      <div className="register-container-Left">
        <motion.h1 className="register-text" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>Bienvenue</motion.h1>
        <motion.h2 className="register-subtext" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>Sur notre site</motion.h2>
      </div>
      <div className="register-container-Right">
        <motion.form className="register-form" onSubmit={handleSubmit} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}>
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
        </motion.form>
      </div>
    </div>
  );
};

export default Register;    