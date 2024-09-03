import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function PictureGrid() {
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pictures function
  const fetchPictures = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/pictures?page=${page}`);
      setPictures((prevPictures) => [...prevPictures, ...response.data]);
    } catch (err) {
      setError('Error fetching pictures');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Effect to fetch pictures when page changes
  useEffect(() => {
    fetchPictures();
  }, [fetchPictures]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
    setPage((prevPage) => prevPage + 1);
  }, [loading]);

  // Effect to add/remove scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="picture-grid">
      {error && <p>{error}</p>}
      {pictures.map((pic) => (
        <div key={pic._id} className="picture-item">
          <img src={pic.url} alt={pic.description} />
          <p>{pic.description}</p>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default PictureGrid;
