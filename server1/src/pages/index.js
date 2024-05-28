const express = require('express');
const router = express.Router();
const { getPokemonList, deletePokemon } = require('../services/pokemon');
const { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists, pokemonNotFound } = require('../helpers/errors');

router.get('/', async (req, res) => {
  try {
    const { list } = await getPokemonList();
    const error = req.cookies.error;
    const body = req.cookies.body ? JSON.parse(req.cookies.body) : null;
    const nameError = error === nameTooLong || error === nameTooShort;

    res.render('index', {
      list,
      error,
      body,
      nameError
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar la lista de Pokémon');
  }
});

router.post('/api/pokemon', async (req, res) => {
  try {
    const { id, name } = req.body;

    // Verificar si el Pokémon ya existe en la base de datos
    const existingPokemon = await getPokemonById(id);
    if (existingPokemon) {
      throw new Error(pokemonAlreadyExists);
    }

    // Crear el nuevo Pokémon en la base de datos
    await createPokemon({ id, name });

    // Redirigir a la página principal con un mensaje de éxito
    res.cookie('error', null);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.cookie('error', err.message);
    res.redirect('/');
  }
});

router.post('/api/pokemon/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Lógica para eliminar un Pokémon
    await deletePokemon(id);

    res.redirect('/');
  } catch (err) {
    if (err.message === pokemonNotFound) {
      console.error(err);
      res.status(404).send('Pokémon no encontrado');
    } else {
      console.error(err);
      res.status(500).send('Error al eliminar el Pokémon');
    }
  }
});

module.exports = router;
