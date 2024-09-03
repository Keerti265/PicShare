import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PictureModal from '../components/PictureModal';
import '../styles/FavoritesPage.css';

function FavoritesPage({favorites=[],pictures=[]}) {
  const [allFavorites, setAllFavorites] = useState([]);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const username = 'John'; // Replace with dynamic username if needed

  // Fetch favorites from localStorage
  useEffect(() => {
    // const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoritePictures=pictures.filter(picture=>favorites.includes(picture._id))
    setAllFavorites(favoritePictures);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleSharePic = () => {
    navigate('/share-pic'); // Assumes a route exists for sharing a picture
  };

  // Check if a picture is a favorite
  const isFavorite = (id) => allFavorites.some((fav) => fav._id === id);

  // Toggle the favorite status of a picture
  const toggleFavorite = (picture) => {
    setAllFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((fav) => fav._id === picture._id);
      if (isAlreadyFavorite) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav._id !== picture._id);
      } else {
        // Add to favorites
        return [...prevFavorites, picture];
      }
    });
  };

  // Open the modal with the selected picture
  const openModal = (picture) => {
    setSelectedPicture(picture);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPicture(null);
  };

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <NavLink to="/">PicShare</NavLink>
          </div>
          <NavLink to="/" className="nav-link-home">Home</NavLink>
          <NavLink to="/favorites" className="nav-link-favorites">Favorites</NavLink>
        </div>
        
        <div className="header-right">
          <button onClick={handleSharePic} className="action-button">Share Pic</button>
          <span className="user-greeting">Hi {username}</span>
          <span onClick={handleLogout} className="logout-text">Log out</span>
        </div>
      </header>
      
      <h4>You Saved Pictures</h4>
      <div className="image-grid-container">
        {allFavorites.length > 0 ? (
          allFavorites.map((picture) => (
            <div key={picture._id} className="image-item" onClick={() => openModal(picture)}>
              <img src={picture.url} alt={picture.description} />
              <div className="image-info">
                <p className="image-description">{picture.description}</p>
                {/* MUI heart icon for favorites */}
                <FavoriteIcon
                  className={`newfav heart-icon ${isFavorite(picture._id) ? 'favorite' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents click from triggering the modal
                    toggleFavorite(picture);
                  }}
                />
                <div className="image-details-bottom">
                  <p className="image-name">{picture.name}</p>
                  <p className="image-date">{new Date(picture.date).toISOString().split('T')[0]}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite pictures yet.</p>
        )}
      </div>

      {selectedPicture && (
        <PictureModal
          isOpen={isModalOpen}
          picture={selectedPicture}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default FavoritesPage;
