import express from 'express';
import morgan from 'morgan'; 
import especialidadesRouter from "./routes/v1/especialidadesRoutes.js";
import usuariosRouter from "./routes/v1/usuariosRoute.js";

const app = express();

// Middlewares globales
app.use(express.json());
app.use(morgan('dev')); // <-- 2. Registrar el middleware de Morgan

// Rutas
app.use('/v1/especialidades', especialidadesRouter);
app.use('/v1/usuarios', usuariosRouter);

process.loadEnvFile();

const PUERTO = process.env.PORT;

app.listen(PUERTO || 3000, () => {
    console.log(`Servidor iniciado OK en puerto ${PUERTO || 3000}`);
});