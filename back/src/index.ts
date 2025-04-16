import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log('Error al conectar con la base de datos:', error));
