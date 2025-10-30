import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Carousel from './components/Carousel';
import Login from './pages/Login';
import History from './pages/History';
import Booking from './pages/Booking';
import CinemaList from './pages/CinemaList'; // ✅ 추가
import MainLayout from './pages/MainLayout'; // ✅ 정확한 경로로 import
import Movies from './pages/Movies'; // ✅ 이름 통일



function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return !!localStorage.getItem('userCode'); // ✅ 로그인 상태 유지
});



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
        <Route path="/history" element={<History />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/cinemas" element={<CinemaList />} /> {/* ✅ 추가 */}
         <Route path="/movies" element={<Movies />} /> {/* ✅ 영화 목록 경로 */}
      </Routes>
    </Router>
  );
}

export default App;