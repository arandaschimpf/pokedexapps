// LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginComponent;
