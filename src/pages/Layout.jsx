import React from 'react';
import './Layout.css'; // 헤더, 푸터 스타일 여기에 작성

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>One Touch</h1>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <p>2nd project</p>
      </footer>
    </div>
  );
}

export default Layout;
