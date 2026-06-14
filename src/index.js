import express from 'express';
import morgan from 'morgan'; 
import fs from "fs";
import path from "path";
import especialidadesRouter from "./routes/v1/especialidadesRoutes.js";
import usuariosRouter from "./routes/v1/usuariosRoute.js";
import obrasSocialesRouter from "./routes/v1/obrasSocialesRoutes.js";
import pacientesRouter from "./routes/v1/pacientesRoute.js";
import medicosRouter from "./routes/v1/medicosRoutes.js";
import turnosReservasRouter from "./routes/v1/turnosReservasRoute.js";
const app = express();

const logStream = fs.createWriteStream(
    path.join("logs", "access.log"),
    { flags: "a" }
);


// Middlewares globales
app.use(express.json());
app.use(morgan("dev")); // Muestra los logs en consola
app.use(
    morgan("combined", {
        stream: logStream
    })
); // Guarda los logs en logs/access.log

// Rutas
app.use('/v1/especialidades', especialidadesRouter);
app.use('/v1/usuarios', usuariosRouter);
app.use("/v1/obras-sociales", obrasSocialesRouter );
app.use("/v1/pacientes", pacientesRouter);
app.use("/v1/medicos", medicosRouter);
app.use("/v1/turnos-reservas", turnosReservasRouter);
process.loadEnvFile();

const PUERTO = process.env.PORT;

app.listen(PUERTO || 3000, () => {
    console.log(`Servidor iniciado OK en puerto ${PUERTO || 3000}`);
});
