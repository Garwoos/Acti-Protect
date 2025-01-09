import React, { useState } from 'react';
import './login.css'; // Facultatif, pour styliser la page
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez ajouter une logique de validation ou d'authentification ici
    console.log('Email:', email, 'Password:', password);
  };
  return (
    <div className='login-container'>
      <div className="login-container-Left">
        <motion.h1 className='login-text' initial={{x:50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1.5,ease:"easeInOut"}}>Bienvenue</motion.h1>
        <motion.h2 className='login-subtext' initial={{x:-50,opacity:0}} animate={{x:0,opacity:1}} transition={{duration:1.5,ease:"easeInOut"}}>Sur notre site</motion.h2>
      </div>


      <div className="login-container-Right">
        <motion.form className="login-form" onSubmit={handleSubmit} initial={{y:50,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:1.5,ease:"easeInOut"}}>
          <h2 className>Se Connecter</h2>
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
        </motion.form>
      </div>
    </div>
  );
};

export default Login;