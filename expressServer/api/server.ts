import express from 'express';
import router from './routes'; // Importa el enrutador que definiste
import { signup } from './controllers';
import { login } from './controllers';

const app = express();

app.use(express.json());
// app.use('/api', router); // Monta el enrutador en la ruta /api
app.post('/signup', signup);
app.post('/login', login);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
