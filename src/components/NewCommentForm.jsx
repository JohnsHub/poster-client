// src/components/NewCommentForm.jsx

import React, { useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from '../api/axios';

const NewCommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post('/comments', { postId, content });
    onCommentAdded(data);
    setContent('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <InputGroup size="sm">
        <FormControl
          placeholder="Write a comment…"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? '…' : 'Reply'}
        </Button>
      </InputGroup>
    </form>
  );
};

export default NewCommentForm;
