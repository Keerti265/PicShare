// src/components/ImageTest.js
import React from 'react';
import rose1 from '../assets/rose1.jpeg';

function ImageTest() {
  return (
    <div>
      <h1>Image Test</h1>
      <img src={rose1} alt="Rose" />
    </div>
  );
}

export default ImageTest;
