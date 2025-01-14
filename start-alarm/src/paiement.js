import React from 'react';
import { motion } from 'framer-motion';
import './paiement.css';
import NavBar from './navBar';

const Paiement = () => {
  return (
    <div className="paiement-main">
      <div className="paiement-navbar">
        <NavBar />
      </div>
      <div className="paiement-content">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }} 
          className="paiement-title"
        >
          Paiement Sécurisé
        </motion.h1>
        <motion.form 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5 }}
          className="paiement-form"
        >
          <label>Nom sur la carte</label>
          <input type="text" placeholder="Votre nom" className="paiement-input" />
          <label>Numéro de carte</label>
          <input type="text" placeholder="1234 5678 9012 3456" className="paiement-input" />
          <div className="paiement-row">
            <div>
              <label>Date d'expiration</label>
              <input type="text" placeholder="MM/AA" className="paiement-input" />
            </div>
            <div>
              <label>Code CVV</label>
              <input type="text" placeholder="123" className="paiement-input" />
            </div>
          </div>
          <button type="submit" className="paiement-submit">Payer</button>
        </motion.form>
      </div>
    </div>
  );
};

export default Paiement;
