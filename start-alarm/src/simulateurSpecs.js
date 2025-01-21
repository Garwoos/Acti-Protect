import React, { useState, useEffect } from 'react';
import './simulateurSpecs.css';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import NavBar from './navBar';
import { Link } from 'react-router-dom';

const SimulateurSpecs = () => {
  const [housingType, setHousingType] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);

  // Options spécifiques aux types d'habitation
  const options = {
    maison: [
      { id: 1, variant: 'primary', title: 'Étages', text: 'Maison avec étages' },
      { id: 2, variant: 'success', title: 'Plein pied', text: 'Maison de plein pied' },
      { id: 3, variant: 'info', title: 'Jardin', text: 'Maison avec jardin' },
      { id: 4, variant: 'secondary', title: 'Garage', text: 'Garage attaché' },
    ],
    appartement: [
      { id: 5, variant: 'primary', title: 'Balcon', text: 'Appartement avec balcon' },
      { id: 6, variant: 'success', title: 'Cave', text: 'Appartement avec cave' },
    ],
  };

  // Gestion du changement de type d'habitation
  const handleHousingTypeChange = (e) => {
    setHousingType(e.target.value);
    setSelectedCards([]); // Réinitialiser la sélection
  };

  // Gestion de la sélection des cartes
  const handleCardClick = (id) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((cardId) => cardId !== id) // Désélection
        : [...prevSelected, id] // Ajout
    );
  };

  // Gestion de la soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Type d\'habitation :', housingType);
    console.log('Options sélectionnées :', selectedCards);
  };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simule une progression pour tester l'animation
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 33 ? prev + 0.5 : 33));
    }, 20); // Augmente de 0.5% toutes les 50ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="simulateur-specs">
      <NavBar />
      <Container className="simulateur-specs-container">
        <h1 className="text-center mb-4">Configurer votre plan</h1>
        <Form onSubmit={handleSubmit}>
          {/* Sélection du type d'habitation */}
          <Row className="mb-4">
            <Col>
              <Form.Group>
                <Form.Label className="form-label">Type d'habitation</Form.Label>
                <Form.Select
                  value={housingType}
                  onChange={handleHousingTypeChange}
                  className="custom-select"
                >
                  <option value="" hidden>Sélectionnez</option>
                  <option value="maison">Maison</option>
                  <option value="appartement">Appartement</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Options spécifiques */}
          {housingType && (
            <Row className="g-4">
              {options[housingType].map((option) => (
                <Col key={option.id} sm={6} md={4} lg={3}>
                  <Card
                    onClick={() => handleCardClick(option.id)}
                    className={`clickable-card ${
                      selectedCards.includes(option.id) ? 'selected' : ''
                    }`}
                    border={option.variant}
                  >
                    <Card.Header className="text-center">{option.title}</Card.Header>
                    <Card.Body>
                      <Card.Text>{option.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Bouton Suivant */}
          <div className="text-end mt-4">
          <Link to="/simulateur"><Button
              type="submit"
              className="btn-suivant"
              disabled={selectedCards.length === 0} // Désactiver si aucune carte n'est sélectionnée
            >
              Suivant
            </Button></Link>
          </div>
        </Form>
      </Container>
      <div style={{ padding: "20px" }}>
        <progress className="animated-progress" value={progress} max={100} />
      </div>
    </div>
  );
};

export default SimulateurSpecs;
