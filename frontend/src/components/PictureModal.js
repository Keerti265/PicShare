// src/components/PictureModal.js
import React from 'react';
import '../styles/PictureModal.css'; // Create this CSS file for styling

function PictureModal({ isOpen, picture, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={picture.url} alt={picture.description} className="modal-image" />
        <div className="modal-info">
          <p><strong>Description:</strong> {picture.description}</p>
          <p><strong>Shared by:</strong> {picture.name}</p>
          <p><strong>Date:</strong> {new Date(picture.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default PictureModal;
