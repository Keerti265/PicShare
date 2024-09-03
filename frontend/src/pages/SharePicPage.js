import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/SharePicPage.css'; // Ensure the path is correct
import Modal from '../components/Modal';

const SharePicPage = () => {
  const [pictureUrl, setPictureUrl] = useState('');
  const [pictureDescription, setPictureDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pictures, setPictures] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pictures');
      setPictures(response.data);
    } catch (error) {
      console.error('Error fetching pictures:', error);
    }
  };

  const handleCancel = () => {
    setPictureUrl('');
    setPictureDescription('');
    setShowForm(false);
  };

  const handleShare = async () => {
    try {
      await axios.post('http://localhost:5000/api/pictures', {
        url: pictureUrl,
        description: pictureDescription
      }, {
        headers: {
          'Content-Type': 'application/json',
          'user-id': localStorage.getItem('userId')
        }
      });
      setMessage('Picture shared successfully!');
      setError('');
      fetchPictures();
      setPictureUrl('');
      setPictureDescription('');
      setModalOpen(true); // Open the modal after sharing
    } catch (error) {
      console.error('Error sharing picture:', error.response ? error.response.data : error.message);
      setMessage('');
      setError(`Error sharing picture: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h2>Share A New Picture</h2>
      {showForm && (
        <div>
          <div className="input-container">
            <input
              type="text"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              placeholder="Picture URL"
            />
            <input
              type="text"
              value={pictureDescription}
              onChange={(e) => setPictureDescription(e.target.value)}
              placeholder="Picture Description"
            />
          </div>
          <div className="buttons-container">
            <button onClick={handleCancel} className="cancel-button">Cancel</button>
            <button onClick={handleShare} className="share-button">Share Picture</button>
          </div>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
      
      <div>
        {pictures.map((pic) => (
          <div key={pic._id}>
            <img src={pic.url} alt={pic.description} style={{ width: '100px', height: '100px' }} />
            <p>{pic.description}</p>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Success</h2>
        <p>Your picture has been shared successfully!</p>
      </Modal>
    </div>
  );
};

export default SharePicPage;
