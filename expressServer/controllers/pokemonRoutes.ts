import express from 'express';
import type { Request, Response } from 'express';
import { getPokemonListService, addPokemonService, deletePokemonService } from './pokemonControllers';

const router = express.Router();

router.get('/pokemon', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemonListResponse = await getPokemonListService(page);
    res.json(pokemonListResponse);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.post('/pokemon', addPokemonService); // Aquí utilizamos directamente la función addPokemonService
router.delete('/pokemon:id', deletePokemonService); // Aquí utilizamos directamente la función deletePokemonService

export default router;
