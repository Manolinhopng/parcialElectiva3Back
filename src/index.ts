import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database'; // Importa la función de conexión

import roleRoutes from './routes/role.routes';
import userRoutes from './routes/user.routes';

dotenv.config(); 

const app: Application = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));

app.use(express.json()); 

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.send('API de Gestión de Usuarios y Roles - ¡Funcionando!');
});

app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal en el servidor!');
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`Accede en: http://localhost:${PORT}`);
});