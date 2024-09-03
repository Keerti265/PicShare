import React, { useState } from 'react';

const SharePictureModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleShare = async () => {
    const pictureUrl = 'https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG5.png';
    const title = 'Tom and Jerry';

    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/pictures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pictureUrl, title }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Picture shared:', data);
        setSuccessMessage('Picture shared successfully!');
      } else {
        console.error('Error sharing picture:', response.statusText);
        setErrorMessage('Failed to share picture. Please try again.');
      }
    } catch (err) {
      console.error('Error sharing picture:', err);
      setErrorMessage('An error occurred. Please try again later.');
    }

    setIsLoading(false);
  };
  return (
    <div>
      <h1>Share a Picture</h1>
      <button onClick={handleShare} disabled={isLoading}>
        {isLoading ? 'Sharing...' : 'Share Picture'}
      </button>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default SharePictureModel;
