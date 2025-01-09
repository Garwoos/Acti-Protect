import React, { useRef, useEffect, useState } from 'react';
import windowImgSrc from '../assets/window.png'; // Chemin vers l'image de la fenêtre
import doorImgSrc from '../assets/door.png'; // Chemin vers l'image de la porte

const GridCanvas = ({ tool, toolInHand, setToolInHand }) => {
  const canvasRef = useRef(null);
  const gridSize = 50; // 1 mètre = 50px
  const [lines, setLines] = useState([]); // Stocker les lignes dessinées
  const [currentLine, setCurrentLine] = useState(null);
  const [elements, setElements] = useState([]); // Stocker les éléments placés
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Position du curseur
  const [images, setImages] = useState({}); // Stocker les images préchargées

  useEffect(() => {
    // Précharger les images
    const windowImg = new Image();
    const doorImg = new Image();
    windowImg.src = windowImgSrc;
    doorImg.src = doorImgSrc;

    windowImg.onload = () => {
      setImages((prevImages) => ({ ...prevImages, window: windowImg }));
    };
    doorImg.onload = () => {
      setImages((prevImages) => ({ ...prevImages, door: doorImg }));
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      drawGrid();
    };

    // Ajuster la taille du canvas pour qu'il prenne toute la place disponible
    resizeCanvas();

    // Ajouter un écouteur d'événement pour redimensionner le canvas lorsque la fenêtre change de taille
    window.addEventListener('resize', resizeCanvas);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Définir les propriétés de dessin pour la grille
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;

    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
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

    // Effacer la partie du mur collée aux éléments
    elements.forEach((el) => {
      eraseWallPart(ctx, el);
    });

    // Dessiner les éléments
    elements.forEach((el) => {
      const img = images[el.type];
      if (img) {
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.orientation * Math.PI / 180);
        ctx.drawImage(img, -25, -43, 50, 50); // Ajuster la position pour que le bas de l'image touche le mur
        ctx.restore();
      }
    });

    // Dessiner l'élément en main sous le curseur
    if (toolInHand) {
      const img = images[toolInHand];
      if (img) {
        const { snappedPosition, angle } = snapToWall(cursorPosition.x, cursorPosition.y, lines);
        ctx.save();
        ctx.translate(snappedPosition.x, snappedPosition.y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.drawImage(img, -25, -50, 50, 50); // Ajuster la position pour que le bas de l'image touche le mur
        ctx.restore();
      }
    }
  };

  const eraseWallPart = (ctx, element) => {
    const { x, y, orientation } = element;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(orientation * Math.PI / 180);
    ctx.clearRect(-20, -15, 40, 20); // Effacer la partie du mur collée à l'élément
    ctx.restore();
  };

  useEffect(() => {
    drawGrid();
  }, [lines, currentLine, elements, toolInHand, cursorPosition, images]);

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (toolInHand) {
      const { snappedPosition, angle } = snapToWall(x, y, lines);
      const id = `${toolInHand}-${elements.length + 1}`; // Générer un identifiant unique
      setElements([...elements, { id, x: snappedPosition.x, y: snappedPosition.y, type: toolInHand, orientation: angle }]);
      setToolInHand(null); // Réinitialiser l'élément en main
    } else {
      setCurrentLine({ startX: x, startY: y, endX: x, endY: y });
    }
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });

    if (!currentLine) return;

    if (currentLine) {
      setCurrentLine({ ...currentLine, endX: x, endY: y });
    }
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

    const { snappedPosition, angle } = snapToWall(x, y, lines);
    const id = `${type}-${elements.length + 1}`; // Générer un identifiant unique
    setElements([...elements, { id, x: snappedPosition.x, y: snappedPosition.y, type, orientation: angle }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const snapToWall = (x, y, lines, threshold = 50) => {
    let closestPoint = { x, y };
    let closestAngle = 0;
    let minDistance = Infinity;

    lines.forEach((line) => {
      const points = [
        { x: line.startX, y: line.startY },
        { x: line.endX, y: line.endY },
      ];

      points.forEach((point) => {
        const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
        if (distance < minDistance && distance < threshold) {
          minDistance = distance;
          closestPoint = point;
          closestAngle = Math.atan2(line.endY - line.startY, line.endX - line.startX) * 180 / Math.PI;
        }
      });

      // Calculer la projection du point (x, y) sur la ligne
      const lineLength = Math.sqrt((line.endX - line.startX) ** 2 + (line.endY - line.startY) ** 2);
      const t = ((x - line.startX) * (line.endX - line.startX) + (y - line.startY) * (line.endY - line.startY)) / (lineLength ** 2);
      if (t >= 0 && t <= 1) {
        const projection = {
          x: line.startX + t * (line.endX - line.startX),
          y: line.startY + t * (line.endY - line.startY),
        };
        const projectionDistance = Math.sqrt((x - projection.x) ** 2 + (y - projection.y) ** 2);
        if (projectionDistance < minDistance && projectionDistance < threshold) {
          minDistance = projectionDistance;
          closestPoint = projection;
          closestAngle = Math.atan2(line.endY - line.startY, line.endX - line.startX) * 180 / Math.PI;

          // Inverser l'orientation si l'élément est à gauche du mur
          if (x < projection.x) {
            closestAngle += 180;
          }
        }
      }
    });

    return { snappedPosition: closestPoint, angle: closestAngle };
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