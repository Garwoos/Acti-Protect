import React, { useRef, useEffect, useState } from 'react';
import windowImg from '../assets/window.png'; // Chemin vers l'image de la fenêtre
import doorImg from '../assets/door.png'; // Chemin vers l'image de la porte

const GridCanvas = ({ tool }) => {
  const canvasRef = useRef(null);
  const gridSize = 50; // 1 mètre = 50px
  const [lines, setLines] = useState([]); // Stocker les lignes dessinées
  const [currentLine, setCurrentLine] = useState(null);
  const [elements, setElements] = useState([]); // Stocker les éléments placés

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajuster la taille du canvas pour qu'il prenne toute la place disponible
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Dessiner la grille
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
      }

      // Dessiner les lignes tracées
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.stroke();
      });

      if (currentLine) {
        ctx.beginPath();
        ctx.moveTo(currentLine.startX, currentLine.startY);
        ctx.lineTo(currentLine.endX, currentLine.endY);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5;
        ctx.stroke();
      }

      // Dessiner les éléments
      elements.forEach((el) => {
        const img = new Image();
        img.src = el.type === 'window' ? windowImg : doorImg;
        img.onload = () => {
          ctx.save();
          ctx.translate(el.x, el.y);
          ctx.rotate(el.orientation * Math.PI / 180);
          ctx.drawImage(img, -25, -25, 50, 50); // Redimensionner l'image à 50px
          ctx.restore();
        };
      });
    }

    drawGrid();
  }, [lines, currentLine, elements]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    
    setCurrentLine({ startX, startY, endX: startX, endY: startY });
  };

  const handleMouseMove = (e) => {
    if (!currentLine) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    setCurrentLine({ ...currentLine, endX, endY });
  };

  const handleMouseUp = () => {
    if (currentLine) {
      const snappedEnd = snapToGrid(currentLine.endX, currentLine.endY, lines);
      setLines([...lines, { ...currentLine, endX: snappedEnd.x, endY: snappedEnd.y }]);
      setCurrentLine(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const type = e.dataTransfer.getData('elementType');

    const snappedPosition = snapToGrid(x, y, lines);
    setElements([...elements, { x: snappedPosition.x, y: snappedPosition.y, type, orientation: 0 }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const rotateElement = (index) => {
    setElements(elements.map((el, i) => i === index ? { ...el, orientation: (el.orientation + 90) % 360 } : el));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', display: 'block', backgroundColor: '#fff' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      />
      <button onClick={() => rotateElement(0)} style={{ position: 'absolute', top: 10, left: 10 }}>Rotate Element</button>
    </div>
  );
};

const snapToGrid = (x, y, lines, threshold = 15) => {
  for (let line of lines) {
    if (Math.abs(x - line.startX) < threshold && Math.abs(y - line.startY) < threshold) {
      return { x: line.startX, y: line.startY };
    }
    if (Math.abs(x - line.endX) < threshold && Math.abs(y - line.endY) < threshold) {
      return { x: line.endX, y: line.endY };
    }
  }
  return { x, y };
};

export default GridCanvas;