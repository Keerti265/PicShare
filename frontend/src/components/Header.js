// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SharePictureModal from './SharePictureModal'; // Ensure the import matches your component file
import '../styles/Header.css';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <div className="logo">PicShare</div>
      <div className="actions">
        <Link to="/login">Log In</Link>
        <button onClick={openModal}>Share Pic</button> {/* Open the modal */}
      </div>
      {/* Render the modal */}
      <SharePictureModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onShare={(picture) => {
          // Handle the picture sharing here
          // This function can be used to handle the picture sharing process
          console.log('Picture to share:', picture);
          closeModal(); // Close the modal after sharing
        }}
      />
    </header>
  );
}

export default Header;
