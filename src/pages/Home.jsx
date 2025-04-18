import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import NewPostForm from '../components/NewPostForm';
import PostCard    from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { auth }          = useContext(AuthContext);

  useEffect(() => {
    axios.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNewPost = post => {
    setPosts(prev => [post, ...prev]);
  };

  const handleDeletePost = id => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePost = updatedPost => {
    setPosts(prev =>
      prev.map(p => p.id === updatedPost.id ? updatedPost : p)
    );
  };

  return (
    <div className="container mt-4">
      {auth.user && <NewPostForm onPostCreated={handleNewPost} />}

      <h2 className="mb-4">Latest Posts</h2>
      {posts.length === 0
        ? <p>No posts yet.</p>
        : posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
              onCommentAdded={() => {}}
              onUpdate={handleUpdatePost}
            />
          ))
      }
    </div>
  );
};

export default Home;
