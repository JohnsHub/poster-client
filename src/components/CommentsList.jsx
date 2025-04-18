// src/components/CommentsList.jsx

import React, { useEffect, useState, useContext } from 'react';
import { Button, Image } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const CommentsList = ({ postId, onCommentDeleted }) => {
  const { auth } = useContext(AuthContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`/comments?postId=${postId}`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [postId]);

  const handleDelete = async id => {
    if (!window.confirm('Delete this comment?')) return;
    await axios.delete(`/comments/${id}`);
    setComments(prev => prev.filter(c => c.id !== id));
    onCommentDeleted?.(id);
  };

  return (
    <ul className="list-unstyled mb-3">
      {comments.map(c => (
        <li key={c.id} className="d-flex align-items-start">
          <Image
            src={`https://ui-avatars.com/api/?name=${c.userName}&background=FF6B6B&color=fff`}
            roundedCircle
            width={32}
            height={32}
            className="me-2"
          />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <strong>@{c.userName}</strong>
              {auth.user?.username === c.userName && (
                <Button
                  variant="light"
                  className="btn-icon"
                  onClick={() => handleDelete(c.id)}
                >
                  <FaTrash />
                </Button>
              )}
            </div>
            <div>{c.content}</div>
            <small className="text-muted">{new Date(c.commentedAt).toLocaleString()}</small>
          </div>
        </li>
      ))}
      {comments.length === 0 && <p className="text-muted small">No comments yet.</p>}
    </ul>
  );
};

export default CommentsList;
