import React from 'react';
import { useLocation } from 'react-router-dom';

function Admin() {
  const location = useLocation();
  const user = location.state;

  return (
    <div className="admin-container">
      <h2>관리자 페이지</h2>
      <p>관리자 ID: {user?.userId}</p>
      <p>이메일: {user?.email}</p>
    </div>
  );
}

export default Admin;
