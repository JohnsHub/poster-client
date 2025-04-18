import React, { useState } from 'react';
import axios from '../api/axios';

const EditPostForm = ({ post, onCancel, onUpdate }) => {
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.put(`/posts/${post.id}`, { content });
      onUpdate({ ...post, content });
    } catch (err) {
      console.error('Failed to update post', err.response?.data || err);
      setError('Could not save changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <textarea
        className="form-control mb-2"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        disabled={loading}
      />
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary btn-sm me-2"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
    </form>
  );
};

export default EditPostForm;
