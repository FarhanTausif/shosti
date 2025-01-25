'use client';

import { useState } from 'react';
import { AdminLoginForm } from './components/AdminLoginForm';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        const data = await response.json();
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  const clearError = () => {
    if (error) setError('');
  };

  return (
    <AdminLoginForm
      email={email}
      password={password}
      error={error}
      handleEmailChange={(e) => {
        setEmail(e.target.value);
        clearError();
      }}
      handlePasswordChange={(e) => {
        setPassword(e.target.value);
        clearError();
      }}
      handleSubmit={handleSubmit}
      clearError={clearError}
    />
  );
};

export default AdminLoginPage;