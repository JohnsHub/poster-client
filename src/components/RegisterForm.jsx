import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/account/register', { username, email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          required
        />
      </div>
      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
  );
};

export default RegisterForm;
