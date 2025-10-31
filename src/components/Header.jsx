import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // 경로는 실제 위치에 맞게 조정

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userCode');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-left"></div> {/* 왼쪽 빈 공간 */}
      <div className="header-center">
      <img src={logo} alt="NOVACINEMA Logo" className="logo" />
      </div>
      <div className="header-right">        
        {isLoggedIn ? (
         <span onClick={handleLogout} className="auth-link">로그아웃</span>
        ) : (
         <Link to="/login" className="auth-link">로그인</Link>
        )}
      </div>
    </header>
  );
}

export default Header;