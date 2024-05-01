import express from 'express';
import { signup, login } from './controllers'; // Importa los controladores de signup y login

const router = express.Router();

// Rutas para registro e inicio de sesión
router.post('/signup', signup);
router.post('/login', login);

export default router;
