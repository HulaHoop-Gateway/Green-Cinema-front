import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Login.css';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

 const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8082/auth/login', {
     id: userId,
     password: password,
    });

    console.log('로그인 응답:', response.data);

    if (response.status === 200 && response.data.userCode) {
      localStorage.setItem('userCode', response.data.userCode);
      setIsLoggedIn(true);
      alert('로그인 성공!');
      navigate('/');
    }  
   } catch (error) {
    // 로그인 실패 처리
    if (error.response && error.response.status === 401) {
      alert('로그인 실패: 아이디 또는 비밀번호가 올바르지 않습니다');
    } else {
      alert('서버 오류로 로그인할 수 없습니다');
    }

    // 로그인 상태 초기화
    localStorage.removeItem('userCode');
    setIsLoggedIn(false);

    // 메인페이지로 이동
    navigate('/');
  }
};


  return (
    <div className="login-page">
      <header className="login-header">
        <img src={logo} alt="Logo" className="logo login-logo" onClick={() => navigate('/')} />
      </header>

      <nav className="menu-bar">
        <button onClick={() => navigate('/booking')}>예매</button>
        <button 
        onClick={() => {
          const userCode = localStorage.getItem('userCode');
          if (!userCode) {
            alert('로그인이 필요한 서비스입니다');
            return;
          }
          navigate('/history');
        }}
        >
        이용내역</button>
        <button onClick={() => navigate('/movies')}>영화</button>
        <button onClick={() => navigate('/cinemas')}>영화관</button>
        <button onClick={() => navigate('/events')}>이벤트</button>
        <button onClick={() => navigate('/store')}>스토어</button>
      </nav>

      <main className="login-section">
      <h2 className="login-title">로그인</h2>

      <div className="login-form-wrapper">
      <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />  
        <button type="submit">로그인</button>
    </form>
  </div>
</main>
</div>
);
}
 export default Login;