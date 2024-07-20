import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email.trim()) {
      localStorage.setItem('userEmail', email);
      navigate('/');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="Auth container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-2xl mb-4">User Authentication</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Log In
      </button>
    </div>
  );
};

export default Auth;
