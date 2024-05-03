const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Cargar y utilizar las rutas y lógica de Astro
app.use('/', require('./src/pages/index.js'));
app.use('/login', require('./src/pages/login.js'));
// Agrega más rutas según sea necesario

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor Express está corriendo en el puerto 3000');
});
