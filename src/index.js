import express from 'express';
import especialidadesRouter from "./routes/v1/especialidadesRoutes.js";


const app = express();

app.use(express.json());

app.use('/api/v1/especialidades', especialidadesRouter);

process.loadEnvFile();
const PUERTO = process.env.PORT;

app.listen(PUERTO || 3000, () => {
    console.log(`servidor iniciado OK en puerto ${PUERTO}`);
})