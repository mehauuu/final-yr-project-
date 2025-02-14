import React, { useState } from 'react';
import './AuthForm.css'; // Assuming you have this CSS file for styling

const AuthForm = ({ onSubmit, buttonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(email, password);
    // Clear form fields after submission if necessary
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
        className="auth-input"
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
        className="auth-input"
      />
      <button type="submit" className="auth-button">{buttonText}</button>
    </form>
  );
};

export default AuthForm;