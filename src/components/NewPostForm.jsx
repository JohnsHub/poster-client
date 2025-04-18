import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const NewPostForm = ({ onPostCreated }) => {
  const { auth }           = useContext(AuthContext);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  if (!auth.user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/posts', { content });
      console.log('🏷️ NewPostForm got back:', data);
      onPostCreated(data);
      setContent('');
    } catch (err) {
      console.error('Error creating post', err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        className="form-control mb-2"
        placeholder="What's happening?"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <button className="btn btn-primary" disabled={loading}>
        {loading ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
};

export default NewPostForm;
