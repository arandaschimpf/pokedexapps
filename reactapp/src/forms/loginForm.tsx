import React from 'react';
import { FormEvent } from 'react'; // Importar tipos para eventos de formulario
import { useAuth } from '../contexto/context'; // Importar el contexto de autenticación

// Dirección del endpoint para el login
const LOGIN = `http://localhost:${import.meta.env.VITE_API_PORT}/login`;

const LoginForm: React.FC = () => { // Anotación para indicar que es un componente funcional
  const { authenticate, error } = useAuth(); // Obtener funciones y estado del contexto de autenticación

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { // Anotación para el evento del formulario
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const formData = new FormData(event.currentTarget); // Obtener valores del formulario
    const email = formData.get("email") as string; // Convertir a string
    const password = formData.get("password") as string; // Convertir a string

    try {
      const response = await fetch(LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include',
      });
    
      console.log("Estado de respuesta:", response.status); // Verificar el estado
      console.log("Texto de respuesta:", response.statusText); // Verificar texto del estado
    
      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta exitosa:", data); // Verificar la respuesta
      } else {
        console.error("Error:", response.statusText); // Manejar errores
      }
    } catch (error) {
      console.error("Error durante el fetch:", error); // Manejar errores
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button 
          type="submit"
          onClick={() => authenticate(true)}
          >
            Iniciar sesión
          </button> {/* Botón para enviar el formulario */}
      </form>

      {error && <p>{error}</p>} {/* Mostrar error si existe */}
    </div>
  );
};

export default LoginForm; // Exportar el componente
