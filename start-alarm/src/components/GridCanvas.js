import React, { useRef, useEffect, useState } from 'react';

const GridCanvas = ({ toolInHand, setToolInHand, step }) => {
  const canvasRef = useRef(null);
  const gridSize = 25; // 1 mètre = 25px
  const [lines, setLines] = useState([]); // Stocker les lignes dessinées
  const [currentLine, setCurrentLine] = useState(null);
  const [elements, setElements] = useState([]); // Stocker les éléments placés
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 }); // Position du curseur
  const [images, setImages] = useState({}); // Stocker les images préchargées
  const [history, setHistory] = useState([]); // Historique des actions

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = {};
      const imageIds = elements.map(el => el.id.split('-')[0]); // Récupérer les IDs des éléments sans suffixe
      for (const id of imageIds) {
        const img = new Image();
        img.src = require(`../assets/ouvertures/${id}.png`);
        await new Promise((resolve, reject) => {
          img.onload = () => {
            console.log(`Image ${id} loaded`);
            loadedImages[id] = img;
            resolve();
          };
          img.onerror = (error) => {
            console.error(`Failed to load image ${id}`, error);
            reject(error);
          };
        }).catch(error => {
          console.error(`Error loading image ${id}:`, error);
        });
      }
      setImages(loadedImages);
    };

    loadImages();
  }, [elements]);

  useEffect(() => {
    const canvas = canvasRef.current;
    
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
      drawLine(ctx, line);
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
      const img = images[el.id.split('-')[0]]; // Utiliser l'ID sans suffixe pour obtenir l'image
      if (img) {
        console.log(`Drawing ${el.id} at (${el.x}, ${el.y}) with orientation ${el.orientation}`);
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.orientation * Math.PI / 180);
        ctx.drawImage(img, -25, -50, 80,80); // Ajuster la position pour que le bas de l'image touche le mur
        ctx.restore();
      } else {
        console.log(`Image for ${el.id} not found`);
      }

      // Dessiner le cercle de détection pour les capteurs
      if (el.type === 'sensor') {
        drawDetectionCircle(ctx, el);
      }
    });

    // Dessiner l'élément en main sous le curseur
    if (toolInHand) {
      const img = images[toolInHand.id];
      if (img) {
        const { snappedPosition, angle } = snapToWall(cursorPosition.x, cursorPosition.y, lines, toolInHand.type);
        ctx.save();
        ctx.translate(snappedPosition.x, snappedPosition.y);
        ctx.rotate(angle * Math.PI / 180);
        ctx.drawImage(img, -25, -50, 80, 80); // Ajuster la position pour que le bas de l'image touche le mur
        ctx.restore();
      } else {
        console.log(`Image for tool in hand (${toolInHand.id}) not found`);
      }
    }
  };

  const drawDetectionCircle = (ctx, element) => {
    const { x, y, range } = element;

    // Commencer à dessiner la zone de détection
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, range, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.fill();
    ctx.restore();

    // Supprimer les parties du cercle bloquées par les murs
    lines.forEach((line) => {
        blockDetectionByWall(ctx, x, y, range, line);
    });
  };

  // Fonction pour bloquer une partie de la zone de détection par un mur
  const blockDetectionByWall = (ctx, cx, cy, range, line) => {
    const { startX, startY, endX, endY } = line;

    // Calculer les points d'intersection
    const intersections = getCircleLineIntersections(cx, cy, range, startX, startY, endX, endY);

    if (intersections.length === 2) {
        const [start, end] = intersections.map(([ix, iy]) => {
            return Math.atan2(iy - cy, ix - cx);
        });

        // Dessiner la partie bloquée (transparente)
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, range, start, end, false); // Dessiner l'arc entre les angles start et end
        ctx.lineTo(endX, endY); // Ligne droite à partir de l'angle de fin jusqu'au mur
        ctx.lineTo(startX, startY); // Ligne droite à partir de l'angle de début jusqu'au mur
        ctx.closePath();
        
        // Utiliser l'opération 'destination-out' pour rendre la partie noire transparente
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
        
        // Réinitialiser l'opération de composition
        ctx.globalCompositeOperation = 'source-over';
    }
  };

  const getCircleLineIntersections = (cx, cy, radius, x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (x1 - cx) + dy * (y1 - cy));
    const C = (x1 - cx) * (x1 - cx) + (y1 - cy) * (y1 - cy) - radius * radius;
    const det = B * B - 4 * A * C;

    if (det < 0) {
      return [];
    } else {
      const t1 = (-B + Math.sqrt(det)) / (2 * A);
      const t2 = (-B - Math.sqrt(det)) / (2 * A);
      const intersections = [];
      if (t1 >= 0 && t1 <= 1) {
        intersections.push([x1 + t1 * dx, y1 + t1 * dy]);
      }
      if (t2 >= 0 && t2 <= 1) {
        intersections.push([x1 + t2 * dx, y1 + t2 * dy]);
      }
      return intersections;
    }
  };

  const eraseWallPart = (ctx, element) => {
    const { x, y, orientation } = element;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(orientation * Math.PI / 180);
    ctx.clearRect(-25, -50, 50, 50); // Effacer la partie du mur collée à l'élément
    ctx.restore();
  };

  useEffect(() => {
    drawGrid();
  }, [lines, currentLine, elements, toolInHand, cursorPosition, images]);

  // Ajoutez cette fonction pour déterminer l'épaisseur selon le type de mur
  const getLineThickness = (wallLabel) => {
    switch (wallLabel) {
      case 'Mur':
        return 7;
      case 'Mur Mitoyen':
        return 20;
      case 'Cloison':
        return 5;
      default:
        return 5;
    }
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Vérifier si un mur est en main
    if (toolInHand && step === 1) {
      // Cliquez pour commencer un mur
      setCurrentLine({
        startX: x,
        startY: y,
        endX: x,
        endY: y,
        thickness: getLineThickness(toolInHand.label),
        lineType: getLineType(toolInHand.label), // Ajoutez cette ligne
      });
    } else if (toolInHand) {
      const { snappedPosition, angle } = snapToWall(x, y, lines, toolInHand.type);
      const id = `${toolInHand.id}`; // Utiliser uniquement l'ID sans suffixe
      const newElement = { id, x: snappedPosition.x, y: snappedPosition.y, type: toolInHand.type, orientation: angle, range: toolInHand.type === 'sensor' ? 50 : undefined };
      setElements([...elements, newElement]);
      setHistory([...history, { type: 'add', element: newElement }]); // Ajouter à l'historique
      setToolInHand(null); // Réinitialiser l'élément en main
    } else if (step === 1) { // Vérifiez l'étape actuelle avant de permettre la pose de murs
      setCurrentLine({ startX: x, startY: y, endX: x, endY: y });
    }
  };

  // Fonction pour obtenir le type de trait en fonction de l'outil
  const getLineType = (label) => {
    switch (label) {
        case 'Mur':
            return 'solid';
        case 'Mur Mitoyen':
            return 'dash-dot'; // Utiliser le nouveau type de trait
        case 'Cloison':
            return 'dotted';
        default:
            return 'solid';
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
      const newLine = {
        ...currentLine,
        endX: snappedEnd.x,
        endY: snappedEnd.y,
        thickness: currentLine.thickness,
      };
      setLines([...lines, newLine]);
      setHistory([...history, { type: 'draw', line: newLine }]); // Ajouter à l'historique
      setCurrentLine(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const type = e.dataTransfer.getData('elementType');

    const { snappedPosition, angle } = snapToWall(x, y, lines, type);
    const id = `${type}`; // Utiliser uniquement l'ID sans suffixe
    setElements([...elements, { id, x: snappedPosition.x, y: snappedPosition.y, type, orientation: angle, range: type === 'sensor' ? 50 : undefined }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const snapToWall = (x, y, lines, type, threshold = 50) => {
    if (type === 'sensor') {
      return { snappedPosition: snapToGrid(x, y, lines), angle: 0 };
    }

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

  const undoLastAction = () => {
    const lastAction = history.pop();
    if (!lastAction) return;

    if (lastAction.type === 'add') {
      setElements(elements.filter(el => el.id !== lastAction.element.id));
    } else if (lastAction.type === 'draw') {
      setLines(lines.slice(0, -1));
    }
    setHistory(history);
  };

  // Fonction de rendu pour dessiner les murs
  const drawLine = (ctx, line) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(line.startX, line.startY);
    ctx.lineTo(line.endX, line.endY);
    ctx.lineWidth = line.thickness;
    ctx.strokeStyle = 'black';

    switch (line.lineType) {
      case 'dashed':
        ctx.setLineDash([5, 15]);
        break;
      case 'dotted':
        ctx.setLineDash([2, 5]);
        break;
      case 'dash-dot':
        ctx.setLineDash([10, 5, 2, 5]);
        break;
      default:
        ctx.setLineDash([]);
    }

    ctx.stroke();
    ctx.restore();
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button onClick={undoLastAction} style={{ position: 'absolute', bottom: 10, left: 10 }}>Undo</button>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid black', display: 'block', backgroundColor: '#fff', marginTop: 64 }}
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