import passport from "passport";
import {estrategia,validacion} from "./config/passport.js";
import express from 'express';
import morgan from 'morgan'; 
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import fs from "fs";
import path from "path";
import authRouter from "./routes/v1/authRoutes.js";
import especialidadesRouter from "./routes/v1/especialidadesRoutes.js";
import usuariosRouter from "./routes/v1/usuariosRoute.js";
import obrasSocialesRouter from "./routes/v1/obrasSocialesRoutes.js";
import pacientesRouter from "./routes/v1/pacientesRoute.js";
import medicosRouter from "./routes/v1/medicosRoutes.js";
import turnosReservasRouter from "./routes/v1/turnosReservasRoute.js";
import cors from "cors";

const app = express();

app.use(cors());

const logStream = fs.createWriteStream(
    path.join("logs", "access.log"),
    { flags: "a" }
);

// Middlewares globales
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use(express.json());
passport.use("login", estrategia);
passport.use("jwt", validacion);

app.use(passport.initialize());
app.use(morgan("dev")); // Muestra los logs en consola
app.use(
    morgan("combined", {
        stream: logStream
    })
); // Guarda los logs en logs/access.log

//Ruta para reportes
app.use("/reportes", express.static("public/reportes"));

// Rutas
app.use("/v1/auth", authRouter);
app.use('/v1/especialidades', especialidadesRouter);
app.use('/v1/usuarios', usuariosRouter);
app.use("/v1/obras-sociales", obrasSocialesRouter );
app.use("/v1/pacientes", pacientesRouter);
app.use("/v1/medicos", medicosRouter);
app.use("/v1/turnos-reservas", turnosReservasRouter);


export default app;