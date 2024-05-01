import React, { FormEvent } from 'react';
import { useAuth } from '../contexto/context';

// Dirección del endpoint para el registro
const SIGN_UP = `http://localhost:4321/signup`;

const SignUpForm: React.FC = () => { // Indicar que es un componente funcional
  // Manejador para el envío del formulario
  const { authenticate } = useAuth(); // Obtener funciones y estado del contexto de autenticación
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => { // Tipo del evento del formulario
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Crear FormData para obtener valores del formulario
    const formData = new FormData(event.currentTarget); 
    const email = formData.get("email") as string; // Asegurar que es string
    const password = formData.get("password") as string; // Asegurar que es string
    console.log(password)
    try {
      // Enviar la solicitud POST
      const response = await fetch(SIGN_UP, {
        method: 'POST',
        body: JSON.stringify({ email, password }), // Convertir el cuerpo a JSON
        headers: { 'Content-Type': 'application/json' }, // Encabezado para JSON
      });

      if (response.ok) {
        const data = await response.json(); // Obtener la respuesta como JSON
        console.log("Registro exitoso:", data); // Acción para registro exitoso
      } else {
        console.log(response)
        console.error("Error al registrarse:", response.statusText); // Manejo de error
      }
    } catch (error) {
      const errorMsg = (error as Error).message; // Obtener el mensaje del error
      console.error("Error durante la solicitud:", errorMsg); // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border px-2"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          className="border px-2"
          type="password"
          id="password"
          name='password'
          required
        />
      </div>
      <button
        className="bg-blue-600 text-white px-2 py-1"
        type="submit"
        onClick={() => authenticate(true)}
      >
        Registrarse
      </button>
    </form>
  );
};

export default SignUpForm;
