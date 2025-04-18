import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  // On mount, load token/user from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { sub: username, nameid: id } = jwtDecode(token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setAuth({ token, user: { username, id } });
      } catch (e) {
        console.error('Invalid token', e);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = (token) => {
    const { sub: username, nameid: id } = jwtDecode(token);
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuth({ token, user: { username, id } });
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
