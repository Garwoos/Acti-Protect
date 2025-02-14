import React, { useState, useEffect, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { motion } from 'framer-motion';
import 'react-alice-carousel/lib/alice-carousel.css';
import './carrousel.css';

const Carrousel = ({ onSelectImage, resetKey, showHomePage }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const images = [
    { id: 0, src: '', content: '', specs: '' }, // Neutral slide for accueil
    { id: 1, src: '/images/icons/icon2.png', content: 'Dessiner vos plans', specs: 'Dessinez vos plans en 2D ou 3D' },
    { id: 2, src: '/images/icons/icon3.png', content: 'Implantez votre matériel', specs: 'Implantez votre matériel sur vos plans' },
    { id: 3, src: '/images/icons/icon4.png', content: 'Testez l’efficacité', specs: 'Testez l’efficacité de votre installation' },
    { id: 4, src: '/images/icons/icon5.png', content: 'Enregistrez votre projet', specs: 'Enregistrez votre projet pour le retravailler plus tard' },
    { id: 5, src: '/images/icons/icon6.png', content: 'Complètez votre fiche de renseignements', specs: 'Complètez votre fiche de renseignements pour obtenir un devis' },
  ];

  const handleDragStart = (e) => e.preventDefault();

  const handleSlideChange = (e) => {
    setActiveIndex(e.item);
    if (e.item === 0) {
      showHomePage();
    } else {
      onSelectImage(images[e.item]);
    }
  };

  useEffect(() => {
    if (activeIndex !== 0) {
      onSelectImage(images[activeIndex]);
    }
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [resetKey]);

  const items = images.map((image, index) => (
    <div
      key={image.id}
      onClick={() => onSelectImage(image)}
      onDragStart={handleDragStart}
      className="carousel-item"
    >
      {image.src && (
        <img
          src={image.src}
          alt={`Image ${image.id}`}
          className="carousel-image"
          style={{
            cursor: 'pointer',
            width: '150px',
            height: '100px',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      )}
      {activeIndex === index && (
        <motion.div
          className="carousel-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <p>{image.content}</p>
        </motion.div>
      )}
    </div>
  ));

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  return (
    <div className="carousel-container">
      <button className="carousel-arrow left-arrow" onClick={slidePrev}>
        &#9664;
      </button>
      <AliceCarousel
        ref={carouselRef}
        mouseTracking
        items={items}
        autoPlay
        infinite
        autoPlayInterval={3000}
        animationDuration={1000}
        disableDotsControls
        disableButtonsControls
        onSlideChanged={handleSlideChange}
        activeIndex={activeIndex} // Ajoutez cette ligne pour contrôler l'index actif
      />
      <button className="carousel-arrow right-arrow" onClick={slideNext}>
        &#9654;
      </button>
    </div>
  );
};

export default Carrousel;