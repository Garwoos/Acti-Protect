import React from 'react';
import { motion } from 'framer-motion';
import './parrainage.css';
import NavBar from './navBar';

const Parrainage = () => {
  return (
    <div className="parrainage-main">
      <div className="parrainage-navbar">
        <NavBar />
      </div>
      <div className="parrainage-content">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }} 
          className="parrainage-title"
        >
          Programme de Parrainage
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.5 }}
          className="parrainage-text"
        >
          Invitez vos amis à découvrir StartAlarm et recevez des récompenses exclusives ! Partagez votre lien de parrainage ci-dessous.
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 1, delay: 0.5 }}
          className="parrainage-link"
        >
          <input type="text" readOnly value="https://startalarm.com/invite/yourcode" className="parrainage-input" />
          <button className="parrainage-copy">Copier</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Parrainage;
