const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../../services/users');
const { signJWT } = require('../../helpers/jwt');

router.post('/api/auth', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Autenticar al usuario
    const user = await authenticateUser({ email, password });
    if (!user) {
      return res.redirect('/login?error=true');
    }

    // Generar un token JWT
    const jwt = signJWT(user);

    // Redirigir al usuario a la página de administrador con el token en una cookie
    res.cookie('user', jwt, { maxAge: 60 * 60 * 24 }); // Ejemplo: cookie con tiempo de vida de 24 horas
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al autenticar al usuario');
  }
});

module.exports = router;
