import express from 'express';
// import pokemonRouter from './controllers/pokemonRoutes';

import type { Request, Response } from 'express';
import { getPokemonListService, addPokemonService, deletePokemonService } from './controllers/pokemonControllers';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
// app.use('/pokemon', pokemonRouter);

app.get('/pokemon', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemonListResponse = await getPokemonListService(page);
    res.json(pokemonListResponse);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.post('/pokemon', addPokemonService); // Aquí utilizamos directamente la función addPokemonService
app.delete('/pokemon:id', deletePokemonService);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
