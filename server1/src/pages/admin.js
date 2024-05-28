const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../helpers/jwt');

router.get('/admin', (req, res) => {
  try {
    const jwt = req.cookies.user;
    if (!jwt) {
      return res.redirect('/login');
    }

    const user = verifyJWT(jwt);
    if (!user) {
      return res.redirect('/login');
    }

    res.render('admin', { title: 'Admin', email: user.email });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar la página de administrador');
  }
});

module.exports = router;
