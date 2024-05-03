import { Request, Response } from "express";
import { createUser, authenticateUser } from "../services/users";
import { signJWT, verifyJWT } from "../helpers/jwt"; // Importa las funciones de JWT
import * as usersDB from "../../db/users";
interface DecodedToken {
  email: string;
  // Puedes agregar otras propiedades del token si es necesario
}
export async function signup(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const response = await createUser({ email, password });
    // Genera el token JWT al registrarse y devuélvelo en la respuesta
    const token = signJWT({ email });
    res.json({ message: response, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await authenticateUser({ email, password });
    // Genera el token JWT al iniciar sesión y devuélvelo en la respuesta
    const token = signJWT({ email });
    res.json({ message: "Inicio de sesión exitoso", user, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
}

export async function getSession(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1]; // Extrae el token del encabezado Authorization

  try {
    const decodedToken = verifyJWT(token);
    if (!decodedToken || typeof decodedToken === "string") {
      return res
        .status(401)
        .json({ error: "Token inválido o no proporcionado" });
    }

    const { email } = decodedToken as DecodedToken; // Cast a DecodedToken para acceder a la propiedad email

    // Ahora puedes usar el email para obtener la información del usuario
    const user = await usersDB.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
