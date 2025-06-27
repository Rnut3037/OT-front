import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import './Register.css';
import Layout from './Layout';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    userId: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate(); // ✅ 네비게이터 훅 사용

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
      const res = await fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorText = await res.text();
        alert('회원가입 실패: ' + errorText);
        window.location.reload();
        return;
      }

      await res.json();
      alert('회원가입 성공');
      navigate('/'); // ✅ 로그인 페이지로 이동
    } catch (err) {
      alert('회원가입 실패: 서버 오류\n' + err.message);
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이름</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>아이디</label>
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
          </div>
          <div>
            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>이메일</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <button type="submit">가입하기</button>
        </form>
      </div>
    </Layout>
  );
}

export default Register;
