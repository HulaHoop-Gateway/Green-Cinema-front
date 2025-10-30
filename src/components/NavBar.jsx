import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userCode');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/booking">예매</Link></li>
        <li><Link to="/history">이용내역</Link></li>
        <li><Link to="/movies">영화</Link></li>
        <li><Link to="/cinemas">영화관</Link></li>
        <li><Link to="/events">이벤트</Link></li>
        <li><Link to="/store">스토어</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;