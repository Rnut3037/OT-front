import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BoardsForm.css';
import Layout from '../users/Layout';

function BoardForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/boards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title, content, authorId: parseInt(userId)})
    })
      .then(() => navigate('/boards'))
      .catch(err => console.error('작성 실패:', err));
  };

  return (
    <Layout>
        <div className="board-form-container">
        <h2>게시글 작성</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>제목</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
            <label>내용</label>
            <textarea
              className="no-resize"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />            
            </div>
            <div>
            <label>작성자 ID (userId)</label>
            <input value={userId} onChange={e => setUserId(e.target.value)} required />
            </div>
            <button type="submit">작성</button>
        </form>
        </div>
    </Layout>
  );
}

export default BoardForm;
