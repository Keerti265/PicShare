import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SharePictureModal from '../components/SharePictureModal';
import '../styles/HomePage.css';
import HomePageBeforeLogin from './HomePageBeforeLogin';
import HomePageAfterLogin from './HomePageAfterLogin';

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [recentPicture, setRecentPicture] = useState(null); // State for recent picture

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }

    // Fetch pictures from backend
    axios.get('http://localhost:5000/api/pictures')
      .then(response => setPictures(response.data))
      .catch(error => console.log(error));
  }, []);

  const toggleFavorite = (pictureId) => {
    if (!isLoggedIn) return;

    axios.post(`http://localhost:5000/api/pictures/${pictureId}/toggle-favorite`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    })
      .then(response => setFavorites(response.data.favorites))
      .catch(error => console.log(error));
  };

  const handleShare = (picture) => {
    axios.post('http://localhost:5000/api/pictures/share', picture, {
      headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
    })
    .then(response => {
      setPictures(prevPictures => [...prevPictures, response.data]);
      setRecentPicture(response.data); // Set the recent picture
      setModalOpen(false); // Close the modal after sharing
    })
    .catch(error => console.log(error));
  };

  const handleCloseRecentPicture = () => {
    setRecentPicture(null);
  };

  return (
    <div>
      <Header onShareClick={() => setModalOpen(true)} />
      <main>
        {!isLoggedIn ? (
          <HomePageBeforeLogin pictures={pictures} />
        ) : (
          <HomePageAfterLogin pictures={pictures} favorites={favorites} toggleFavorite={toggleFavorite} />
        )}
      </main>
      <SharePictureModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onShare={handleShare}
      />
      {recentPicture && (
        <div className="recent-picture-popup">
          <img src={recentPicture.pictureUrl} alt={recentPicture.title} />
          <h3>{recentPicture.title}</h3>
          <button onClick={handleCloseRecentPicture}>Close</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
