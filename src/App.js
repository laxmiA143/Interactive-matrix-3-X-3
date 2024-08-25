import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Initialize a 3x3 matrix with all values set to false, indicating unclicked boxes
  const [matrix, setMatrix] = useState(Array(3).fill(Array(3).fill(false)));

  // State to track the sequence of clicked boxes
  const [sequence, setSequence] = useState([]);

  // State to track when the last box in the sequence is clicked
  const [lastBoxClicked, setLastBoxClicked] = useState(false);

  const handleClick = (i, j) => {
    // Prevent re-clicking the same box if it has already been turned green
    if (matrix[i][j] === 'green') return;

    // Update the matrix to turn the clicked box green
    const newMatrix = matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? 'green' : cell))
    );
    setMatrix(newMatrix);

    // Add the current box's coordinates to the sequence
    setSequence((prevSequence) => [...prevSequence, [i, j]]);

    // Check if this is the last box (9th box) in the sequence
    if (sequence.length === 8) {
      setLastBoxClicked(true);
    }
  };

  // Effect to handle changing box colors to orange in the order of clicks after the last box is clicked
  useEffect(() => {
    if (lastBoxClicked) {
      sequence.forEach(([i, j], index) => {
        // Use setTimeout to change the color of each box to orange in sequence
        setTimeout(() => {
          setMatrix((prevMatrix) =>
            prevMatrix.map((row, rowIndex) =>
              row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? 'orange' : cell))
            )
          );
        }, 1000 * index); 
      });
    }
  }, [lastBoxClicked, sequence]);

  // Render the 3x3 grid of boxes
  return (
    <div className="grid">
      {matrix.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`box ${cell}`} 
              onClick={() => handleClick(i, j)} 
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
