import React, { useEffect, useRef } from 'react';
import './carrousel.css';

const Carrousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, offsetWidth } = carouselRef.current;

        // Si on atteint la fin, revenir doucement au début
        if (scrollLeft + offsetWidth >= scrollWidth) {
          carouselRef.current.scrollLeft = 0;
        } else {
          carouselRef.current.scrollBy({
            left: 1, // Défilement continu
            behavior: 'smooth',
          });
        }
      }
    };

    const interval = setInterval(scroll, 20); // Vitesse du défilement
    return () => clearInterval(interval); // Nettoyage à la fin
  }, []);

  const images = [
    { src: 'https://img.freepik.com/free-vector/cyber-security-concept_23-2148534852.jpg', alt: 'Image 1' },
    { src: 'https://montavue.com/cdn/shop/articles/what-is-a-4k-security-camera-how-to-pick-the-right-4k-security-camera-montavue.png?v=1671734366', alt: 'Image 2' },
    { src: 'https://pixelz.cc/wp-content/uploads/2017/11/tech-security-illustration-code-and-key-hole-uhd-4k-wallpaper.jpg', alt: 'Image 3' },
    { src: 'https://www.shutterstock.com/shutterstock/videos/3498656287/thumb/1.jpg?ip=x480', alt: 'Image 4' },
    { src: 'https://media.istockphoto.com/id/1312912134/photo/house-living-smart-home.jpg?s=612x612&w=0&k=20&c=wyaw8_oRoyOxOAxCdm2wC6SGkzyvuvfruFy7Z6K1jSk=', alt: 'Image 5' },
  ];

  return (
    <div className="horizontal-carousel-container">
      <div className="horizontal-carousel" ref={carouselRef}>
        {images.concat(images).map((image, index) => (
          <div className="carousel-item" key={index}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrousel;

