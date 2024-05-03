const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Importa el modelo de usuario

router.post('/api/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('El usuario ya existe');
    }

    // Crear un nuevo usuario
    const newUser = new User({ email, password });
    await newUser.save();

    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al registrar el usuario');
  }
});

module.exports = router;
