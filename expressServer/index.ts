import express from "express";
// import pokemonRouter from './controllers/pokemonRoutes';

import type { Request, Response } from "express";
import {
  getPokemonListService,
  addPokemonService,
  deletePokemonService,
} from "./controllers/pokemonControllers";
import cors from "cors";
import { getSession, login, signup } from "./src/api/controllers";
import { authenticateUser, createUser } from "./src/services/users";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.use(login);
// app.use(signup);
// Rutas
// app.use('/pokemon', pokemonRouter);

app.get("/pokemon", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pokemonListResponse = await getPokemonListService(page);
    res.json(pokemonListResponse);
  } catch (error) {
    res.status(500).json({ error: error as Error });
  }
});

app.post("/pokemon", addPokemonService); // Aquí utilizamos directamente la función addPokemonService
app.delete("/pokemon/:id", deletePokemonService);

app.post("/api/login", login);
app.post("/api/signup", signup);
app.get("/api/getSession", getSession);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
