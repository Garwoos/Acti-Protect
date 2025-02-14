import React, { useState } from 'react';

const Simulation = ({ elements }) => {
  const [simulationResult, setSimulationResult] = useState(null);

  const handleSimulateProtection = () => {
    const totalVulnerability = elements
      .filter(el => el.type === 'ouverture')
      .reduce((acc, el) => acc + el.coefficient, 0);
    const totalEfficiency = elements
      .filter(el => el.type === 'capteur')
      .reduce((acc, el) => acc + el.coefficient, 0);

    const vulnerabilityScore = totalVulnerability / elements.filter(el => el.type === 'ouverture').length;
    const efficiencyScore = totalEfficiency / elements.filter(el => el.type === 'capteur').length;

    const protectionScore = efficiencyScore - vulnerabilityScore;

    let protectionLevel;
    if (protectionScore > 0.75) {
      protectionLevel = 'High';
    } else if (protectionScore > 0.5) {
      protectionLevel = 'Medium';
    } else {
      protectionLevel = 'Low';
    }

    setSimulationResult({
      vulnerabilityScore: vulnerabilityScore.toFixed(2),
      efficiencyScore: efficiencyScore.toFixed(2),
      protectionLevel,
    });

    console.log(`Vulnerability Score: ${vulnerabilityScore}`);
    console.log(`Efficiency Score: ${efficiencyScore}`);
    console.log(`Protection Level: ${protectionLevel}`);
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleSimulateProtection}>Simuler la protection</button>
      {simulationResult && (
        <div style={styles.result}>
          <h3>Résultats de la simulation</h3>
          <p>Vulnérabilité: {simulationResult.vulnerabilityScore}</p>
          <p>Efficacité: {simulationResult.efficiencyScore}</p>
          <p>Niveau de protection: {simulationResult.protectionLevel}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#005f8c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  result: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#2a2e33',
    color: 'white',
    borderRadius: '5px',
    textAlign: 'center',
  },
};

export default Simulation;