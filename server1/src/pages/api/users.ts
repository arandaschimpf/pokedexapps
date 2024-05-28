const router1 = express.Router();

const { createUser } = require('../../services/users');

router1.post('/api/users', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Crear un nuevo usuario
    await createUser({ email, password });

    // Redirigir al usuario a la página de inicio de sesión
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/signup?error=true');
  }
});

module.exports = router1;
