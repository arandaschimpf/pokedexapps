// import React from 'react';

// const Signup: React.FC = () => {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//   };

//   return (
//     <div className="container mx-auto flex flex-col">
//       <h1 className="text-5xl text-red-600 font-extrabold text-center mb-8">Signup</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col items-center">
//         <input type="text" placeholder="Username" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
//         <input type="password" placeholder="Password" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
//         <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      // Registro exitoso, puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
      console.log('Registro exitoso');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex flex-col">
      <h1 className="text-5xl text-red-600 font-extrabold text-center mb-8">Signup</h1>
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
        <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
