import React, { useState } from 'react';
import './Auth.css';
import AuthForm from '../components/AuthForm';
import { loginUser, registerUser } from '../services/authService';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleAuth = async (email, password) => {
    try {
      if (isLogin) {
        await loginUser(email, password);
        // Redirect after login
      } else {
        await registerUser(email, password);
        // Redirect or show success message
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <AuthForm onSubmit={handleAuth} buttonText={isLogin ? 'Login' : 'Register'} />
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? 'Need to Register?' : 'Already have an account?'}
        </p>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Auth;