import React, { useEffect, useState } from 'react';

function CinemaList() {
  const [cinemas, setCinemas] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cinemaRes, theaterRes, seatRes] = await Promise.all([
          fetch('http://localhost:8082/cinemafranchise/list'),
          fetch('http://localhost:8082/theater/list'),
          fetch('http://localhost:8082/seat/list'),
        ]);

        if (!cinemaRes.ok || !theaterRes.ok || !seatRes.ok) {
          throw new Error('서버 응답 오류');
        }

        const [cinemaData, theaterData, seatData] = await Promise.all([
          cinemaRes.json(),
          theaterRes.json(),
          seatRes.json(),
        ]);

        setCinemas(cinemaData);
        setTheaters(theaterData);
        setSeats(seatData);
      } catch (err) {
        setError('조회 실패: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTheatersByBranch = (branchNum) =>
    theaters.filter((t) => Number(t.branchNum) === Number(branchNum));

  const getSeatsByScreening = (screeningNum) =>
    seats.filter((s) => Number(s.screeningNum) === Number(screeningNum));

  return (
    <div style={{ padding: '2rem', paddingTop: '100px' }}>
      <h2>영화관 → 상영관 → 좌석 목록</h2>

      {loading && <p>조회 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {cinemas.map((cinema) => (
        <div key={cinema.branchNum} style={{ marginBottom: '2rem' }}>
          <h3> {cinema.branchName} ({cinema.branchNum})</h3>
          <p>{cinema.address}</p>

          {getTheatersByBranch(cinema.branchNum).map((theater) => (
            <div key={theater.screeningNum} style={{ marginLeft: '1rem', marginBottom: '1rem' }}>
              <strong>🎞️ 상영관 {theater.screeningNumber} (고유번호: {theater.screeningNum})</strong>
              <ul>
                {getSeatsByScreening(theater.screeningNum).map((seat) => (
                  <li key={seat.seatCode}>
                    좌석: {seat.seatRealNum} ({seat.seatRow}{seat.seatColumn}) / {seat.seatType} / {seat.sale}원
                  </li>
                ))}
                {getSeatsByScreening(theater.screeningNum).length === 0 && (
                  <li>좌석 정보 없음</li>
                )}
              </ul>
            </div>
          ))}

          {getTheatersByBranch(cinema.branchNum).length === 0 && (
            <p style={{ marginLeft: '1rem' }}>상영관 정보 없음</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CinemaList;
