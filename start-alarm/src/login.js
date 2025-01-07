import React, { useState } from 'react';
import './login.css'; // Facultatif, pour styliser la page
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter une logique de validation ou d'authentification ici
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Se Connecter</h2>
        <div>
          <input
            type="email"
            id="email"
            placeholder='Adresse e-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder='Mot de passe'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-logo">
          <img src="/images/LOGO-START-ALARM-Q.png" alt="Avatar" />
        </div>
        <div className="no-account">
          <Link to="/register">Pas de compte ? Créer un compte</Link>
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
};

export default Login;