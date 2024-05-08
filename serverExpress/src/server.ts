import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { savePokemon, findPokemonByEmail } from './data/db';
import type { Pokemon } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/send', async (req: Request, res: Response) => {
    try {
        const { email, password, fullName, phone } = req.body as Pokemon;
        const existingUser = await findPokemonByEmail(email);
        if (existingUser) {
            return res.status(400).json('Usuario ya registrado');
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = { email, password: hashedPassword, fullName, phone };
        const result = await savePokemon(newUser);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json(error.message);
    }
});

app.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as Pokemon;
        const user = await findPokemonByEmail(email);
        if (!user) {
            return res.status(400).json('Usuario no encontrado');
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).json('Contraseña incorrecta');
        }
        const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(500).json(error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
