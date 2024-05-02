const express = require('express');
const router = express.Router();
const { getPokemonList } = require('../services/pokemon');
const { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists } = require('../helpers/errors');

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

    // Lógica para agregar un nuevo Pokémon
    // ...

    res.redirect('/', {
      cookies: {
        body: JSON.stringify({ id, name }),
        error: null
      }
    });
  } catch (err) {
    console.error(err);
    res.cookie('error', err.message);
    res.redirect('/');
  }
});

const express = require('express');
const router = express.Router();
const { getPokemonList, deletePokemon } = require('../services/pokemon');
const { invalidInput, nameTooLong, nameTooShort, pokemonAlreadyExists, pokemonNotFound } = require('../helpers/errors');

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
