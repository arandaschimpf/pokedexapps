// import React from 'react';

// const Login: React.FC = () => {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // Aquí podrías implementar la lógica para autenticar al usuario
//   };

//   return (
//     <div className="container mx-auto flex flex-col">
//       <h1 className="text-5xl text-red-600 font-extrabold text-center mb-8">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <input type="text" placeholder="Username" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
//         <input type="password" placeholder="Password" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
//         <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;    

// import React, { useState } from 'react';

// const Login: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3001/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, password })
//       });

//       if (response.ok) {
//         const { token } = await response.json();
//         // Guardar el token en localStorage o sessionStorage
//         localStorage.setItem('token', token);
//         // Redirigir a otra página, por ejemplo, la página principal
//         window.location.href = '/';
//       } else {
//         // Manejar el caso de error de inicio de sesión
//         console.error('Error de inicio de sesión');
//       }
//     } catch (error) {
//       console.error('Error de red:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto flex flex-col">
//       <h1 className="text-5xl text-red-600 font-extrabold text-center mb-8">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <input type="text" placeholder="Username" className="my-1 w-full p-2 border border-gray-300 rounded-lg" value={username} onChange={(e) => setUsername(e.target.value)} />
//         <input type="password" placeholder="Password" className="my-1 w-full p-2 border border-gray-300 rounded-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('Login successful', data);
    } catch (error) {
      console.error('Error de inicio de sesión:');
    }
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-5xl text-red-600 font-extrabold text-center mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Username"
          className="my-1 w-full p-2 border border-gray-300 rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="my-1 w-full p-2 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Login</button>
      </form>
    </div>
  );
};

export default Login;

