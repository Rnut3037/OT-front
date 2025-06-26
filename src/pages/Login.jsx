import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Layout from './Layout';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // 이전 메시지 초기화

    try {
      const res = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        // 서버에서 내려준 에러 메시지를 그대로 사용자에게 보여줌
        throw new Error(errorData.message || '로그인 실패');
      }

      const user = await res.json();

      if (user.admin === true) {
        navigate('/admin', { state: user });
      } else {
        navigate('/main', { state: user });
      }

    } catch (err) {
      // 오류 메시지 표시 (예: 존재하지 않는 ID, 비밀번호 불일치 등)
      alert(err.message); // 또는 setMessage(err.message);
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <Layout>

    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            />
        </div>
        <button type="submit">로그인</button>
      </form>

      <button onClick={handleGoToRegister}>회원가입 하러 가기</button>
    </div>
            </Layout>
  );
}

export default Login;
