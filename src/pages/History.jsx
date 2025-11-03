import React, { useEffect, useState } from 'react';
import axios from 'axios';

function History() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const userCode = localStorage.getItem('userCode'); 
      console.log('userCode:', userCode);
    // 로그인 시 저장된 값
    if (!userCode) return;

    axios.get(`http://localhost:8082/reservation/history?userCode=${userCode}`)
      .then(res => {
         console.log('예약 내역 응답:', res.data); // ✅ 확인
        setReservations(res.data);
      })
      .catch(err => console.error('예약 내역 불러오기 실패', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>이용 내역</h2>
      {reservations.length === 0 ? (
        <p>예약 내역이 없습니다.</p>
      ) : (
        <ul>
          {reservations.map((r) => (
            <li key={r.reservationNum}>
            🎫 예약번호: {r.reservationNum} / 좌석번호: {r.seatNumber} / 결제시간: {r.paymentTime} / 상태: {r.state}
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default History;