import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PictureList = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pictures');
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching pictures:', error);
      }
    };

    fetchPictures();
  }, []);

  return (
    <div>
      <h1>Picture List</h1>
      <ul>
        {pictures.map(picture => (
          <li key={picture._id}>
            <img src={picture.url} alt={picture.description} style={{ width: '100px' }} />
            <p>{picture.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PictureList;
