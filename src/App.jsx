import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import Login from './pages/Login';
import History from './pages/History';
import Booking from './pages/Booking';
import CinemaList from './pages/CinemaList';
import Movies from './pages/Movies';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCode = localStorage.getItem('userCode');
    setIsLoggedIn(!!userCode);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/history"
          element={
            <History
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cinemas" element={<CinemaList />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </Router>
  );
}

export default App;