import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        login();
        console.log('Inicio de sesión exitoso');
        navigate('/pokemons');
      } else {
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      setError('Error de red. Por favor, intenta nuevamente más tarde.');
    }

    setEmail('');
    setPassword('');
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input  
            className="border px-2 w-full py-1"
            type="email"
            id="email"
            name="email"
            value={email} 
            onChange={handleEmailChange} 
            required 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input 
            className="border px-2 w-full py-1" 
            type="password" 
            id="password"
            name="password"
            value={password} 
            onChange={handlePasswordChange} 
            required 
          />
        </div>
        <button className="bg-red-600 text-white px-4 py-2 w-full rounded-full" type="submit">Iniciar sesión</button>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-full" onClick={() => navigate('/signup')}>
        Registrarse
      </button>
    </div>
  );
};

export default LoginForm;
