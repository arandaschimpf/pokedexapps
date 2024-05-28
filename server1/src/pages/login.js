const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); // Importa la clave secreta para firmar el token

router.post('/api/auth', (req, res) => {
  try {
    const { email, password } = req.body;

    // Aquí iría la lógica para autenticar al usuario (por ejemplo, verificar las credenciales en una base de datos)
    const user = authenticateUser(email, password);

    if (!user) {
      return res.status(401).send('Credenciales inválidas');
    }

    // Genera el token JWT con la información del usuario
    const token = jwt.sign({ email: user.email }, secretKey);

    // Envia el token como respuesta
    res.cookie('user', token); // Opcional: Almacena el token en una cookie
    res.redirect('/admin'); // Redirige al usuario a la página de administrador
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al iniciar sesión');
  }
});

module.exports = router;
