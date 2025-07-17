import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigate('/add-shelter-form');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
