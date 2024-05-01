import { Request, Response } from 'express';
import { createUser, authenticateUser } from '../services/users'; // Importa las funciones de createUser y authenticateUser

export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    await createUser({ email, password });
    res.json({ message: 'Registro exitoso' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser({ email, password });
    res.json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
