// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavigationBar from './components/NavigationBar';
import Home          from './pages/Home';
import LoginForm     from './components/LoginForm';
import RegisterForm  from './components/RegisterForm';

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper">  {/* ← wrapper for full‐page bg */}
        <Router>
          <NavigationBar />
          <Routes>
            <Route path="/login"    element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/"         element={<Home />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
