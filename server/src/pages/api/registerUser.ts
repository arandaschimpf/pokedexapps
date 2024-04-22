// Inside the registerUser function, you are making a POST request to register a new user.
const BASE_URL = 'http://localhost:4321/api';
export async function registerUser(email: string, password: string) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      return true; // Registration successful
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}
