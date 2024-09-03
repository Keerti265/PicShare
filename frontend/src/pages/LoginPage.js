import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
import '../styles/LoginPage.css';
import { useAuth } from '../components/context/AuthContext';
 

function LoginPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.userId);
      login()
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <header className="header">
        <div className="logo">PicShare</div>
        <div className="actions">
          <Link to="/login" className="login-button">Log In</Link>
        </div>
      </header>
      <main className="login-main">
        <h2>Pic Share</h2>
        <h4>Login to start sharing</h4>
        <div className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleLogin}>Log In</button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
