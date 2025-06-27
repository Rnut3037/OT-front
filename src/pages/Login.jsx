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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || '로그인 실패');
      }

      const user = await res.json();

      if (user.admin === true) {
        navigate('/admin', { state: user });
      } else {
        navigate('/main', {
          state: {
            userId: user.userId,
            email: user.email  // ✅ 이메일 포함되도록 수정
          }
        });
      }

    } catch (err) {
      alert(err.message);
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

        <button onClick={handleGoToRegister}>회원가입</button>
      </div>
    </Layout>
  );
}

export default Login;
