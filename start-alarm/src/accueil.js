import React from 'react';
import { Link } from 'react-router-dom';
import './accueil.css'; // Pour le style

const Accueil = () => {
  return (
    <div className="accueil-container">
      <header className="accueil-header">
        <img src="/images/LOGO-START-ALARM-Q.png" alt="Logo" className="accueil-logo" />
        <h1>Bienvenue sur Acti-Protect</h1>
        <p>Votre sécurité, notre priorité.</p>
      </header>

      <main className="accueil-main">
        <section className="accueil-section">
          <h2>Fonctionnalités</h2>
          <ul>
            <li>Activez votre alarme en un clic</li>
            <li>Gérez vos paramètres de sécurité</li>
            <li>Suivez l'activité en temps réel</li>
          </ul>
        </section>

        <div className="accueil-buttons">
          <Link to="/login" className="btn btn-primary">Se connecter</Link>
          <Link to="/register" className="btn btn-secondary">Créer un compte</Link>
        </div>
      </main>

      <footer className="accueil-footer">
        <p>&copy; 2025 Acti-Protect. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Accueil;
