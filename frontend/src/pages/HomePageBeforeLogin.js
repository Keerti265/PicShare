import React from 'react';
import { format } from 'date-fns';
import '../styles/HomePageBeforeLogin.css';  
import { Link } from 'react-router-dom'
import rose1 from '../assets/rose1.jpeg';



const images = [
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
  { src: rose1, description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
];

function HomePageBeforeLogin() {
  return (
    <div>
      <header className="home-header">
        <div className="logo">PicShare</div>
        <div className="actions">
          <Link to="/login" className="login-button">Log In</Link>
        </div>
      </header>
      <h4 className="centered-message">
        <Link to="/login" className="login-link">Login</Link> 
        to start sharing your favorite pictures with others!
      </h4>
      
      <div className="image-grid-container">
        {/* Display the images */}
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.src} alt={image.description} />
            <p className="image-description">{image.description}</p>
            <p className="image-name">{image.name}</p>
            <p className="image-date">{format(new Date(image.date), 'dd/MM/yyyy')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePageBeforeLogin;
