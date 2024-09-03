import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/HomePageAfterLogin.css';
import Modal from '../components/Modal'; 
import SharePicPage from '../pages/SharePicPage';
import rose1 from '../assets/rose1.jpeg'; 

function HomePageAfterLogin({ pictures = [], favorites = [], toggleFavorite }) {
  const navigate = useNavigate();

  const [localFavorites, setLocalFavorites] = useState(favorites);
  const [showSharePicModal, setShowSharePicModal] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleSharePicClick = () => {
    setShowSharePicModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowSharePicModal(false); // Hide the modal
  };

  const handleToggleFavorite = (pictureId) => {
    toggleFavorite(pictureId);
  };

  const isFavorite = (id) => localFavorites.some((fav) => fav._id === id);

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <NavLink to="/">PicShare</NavLink>
          </div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Favorites
          </NavLink>
        </div>

        <div className="header-right">
          <button onClick={handleSharePicClick} className="action-button">
            Share Pic
          </button>
          <span onClick={handleLogout} className="logout-text">
            Log out
          </span>
        </div>
      </header>

      <div className="image-grid-container">
        {/* Display imported image for demonstration */}
        <div className="image-item">
          <img src={rose1} alt="Rose" />
          <div className="image-info">
            <p className="image-description">Imported Rose Image</p>
          </div>
        </div>

        {pictures.length > 0 ? (
          pictures.map((picture) => (
            <div key={picture._id} className="image-item">
              <img src={picture.pictureUrl} alt={picture.title} />
              <div className="image-info">
                <div>
                  <p className="image-description">{picture.title}</p>
                  <p className="image-name">{picture.name}</p>
                  <p className="image-date">
                    {format(new Date(picture.date), "dd/MM/yyyy")}
                  </p>
                </div>
                <span
                  className={`heart-icon ${
                    isFavorite(picture._id) ? "favorite" : ""
                  }`}
                  onClick={() => handleToggleFavorite(picture._id)}
                ></span>
              </div>
            </div>
          ))
        ) : (
          <p>No pictures available</p>
        )}
      </div>

      {showSharePicModal &&
        <Modal isOpen={showSharePicModal} onClose={handleCloseModal}>
          <SharePicPage />
        </Modal>
      }
    </div>
  );
}

export default HomePageAfterLogin;
