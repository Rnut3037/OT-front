import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Main.css';
import Layout from './Layout';

function Main() {
  const location = useLocation();
  const user = location.state;

  // 🎲 랜덤 요소를 위한 state
  const [randomImage, setRandomImage] = useState('');
  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/random/800x400?nature',
      'https://source.unsplash.com/random/800x400?city',
      'https://source.unsplash.com/random/800x400?space',
      'https://source.unsplash.com/random/800x400?ocean',
    ];

    const randomImageIndex = Math.floor(Math.random() * images.length);
   
    setRandomImage(images[randomImageIndex]);
  }, []);

  return (
    <Layout>
      <div className="main-container">
        <h2>일반 사용자 메인 페이지</h2>
        <img src={randomImage} alt="랜덤 이미지" className="main-random-image" />
        <h3>인터넷 연결 확인용 무작위 이미지</h3>
        <p>사용자 ID: {user?.userId}</p>
        <p>이메일: {user?.email}</p>
      </div>
    </Layout>
  );
}

export default Main;
