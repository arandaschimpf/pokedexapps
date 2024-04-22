// This file contains code for user login
// This file contains code for user login
const BASE_URL = 'http://localhost:4321/api';

export async function loginUser(email: string, password: string): Promise<string> {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.token; // Return JWT token
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}
