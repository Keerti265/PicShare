import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePageBeforeLogin from './pages/HomePageBeforeLogin';
import LoginPage from './pages/LoginPage';
import HomePageAfterLogin from './pages/HomePageAfterLogin';
import FavoritesPage from './pages/FavoritesPage';
import SharePicPage from './pages/SharePicPage';
import { AuthProvider, useAuth } from './components/context/AuthContext';

const App = () => {

  const [favorites, setFavorites] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Example pictures array
  const pictures = [
    { _id: '1', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22'},
    { _id: '2', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '3', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '4', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '5', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '6', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '7', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '8', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '9', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '10', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '11', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },
    { _id: '12', url: 'assets/rose1.jpeg', description: 'A Beautiful Rose!', name: 'John', date: '2024-08-22' },

    ];

  const toggleFavorite = (id) => {

    console.log(id,favorites);
    
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePageAfterLogin
                  pictures={pictures}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  openSharePicModal={openModal} // Pass the function to open modal
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage favorites={favorites} pictures={pictures} />
              </ProtectedRoute>
            }
          />
          <Route path="/before-login" element={<HomePageBeforeLogin />} />
          <Route path="/share-pic" element ={ <SharePicPage isOpen={isModalOpen} onClose={closeModal} />} />
        </Routes>
s
      </Router>
    </AuthProvider>
  );
};

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/before-login" />;
  }

  return children;
};

export default App;