import React from 'react';
import { useLocation } from 'react-router-dom';

function Main() {
  const location = useLocation();
  const user = location.state;

  return (
    <div className="main-container">
      <h2>일반 사용자 메인 페이지</h2>
      <p>사용자 ID: {user?.userId}</p>
      <p>이메일: {user?.email}</p>
    </div>
  );
}

export default Main;
