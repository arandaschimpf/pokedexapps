import { fetchAPI } from "./fetchAPI";

async function login(email: string, password: string): Promise<any> {
    try {
      const response = await fetchAPI('login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      return response;
    } catch (error) {
      // Manejar errores
      throw new Error('Error al iniciar sesión: ' + error);
    }
  }
  