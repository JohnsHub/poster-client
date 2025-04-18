import React, { useContext, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';
import EditPostForm from './EditPostForm';

const PostCard = ({ post, onDelete, onCommentAdded, onUpdate }) => {
  const { auth } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const canModify = auth.user?.username === post.userName;

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) return;
    await axios.delete(`/posts/${post.id}`);
    onDelete(post.id);
  };

  const handleUpdate = updatedPost => {
    onUpdate(updatedPost);
    setIsEditing(false);
  };

  const createdDate = new Date(post.createdAt).toLocaleString();

  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex align-items-start mb-2">
          <Image
            src={`https://ui-avatars.com/api/?name=${post.userName}&background=0D8ABC&color=fff`}
            roundedCircle
            width={40}
            height={40}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0">@{post.userName}</h6>
            <small className="text-muted">{createdDate}</small>
          </div>
          {canModify && !isEditing && (
            <>
              <Button
                variant="light"
                className="btn-icon me-2"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit />
              </Button>
              <Button
                variant="light"
                className="btn-icon"
                onClick={handleDelete}
              >
                <FaTrash />
              </Button>
            </>
          )}
        </div>

        {isEditing ? (
          <EditPostForm
            post={post}
            onCancel={() => setIsEditing(false)}
            onUpdate={handleUpdate}
          />
        ) : (
          <p className="mb-3">{post.content}</p>
        )}

        {!isEditing && <CommentsList postId={post.id} onCommentDeleted={() => {}} />}

        {auth.user && !isEditing && (
          <NewCommentForm postId={post.id} onCommentAdded={onCommentAdded} />
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
