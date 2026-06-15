process.loadEnvFile();

import app from "./index.js";

const PUERTO = process.env.PORT;

app.listen(PUERTO || 3000, () => {
    console.log(
        `Servidor iniciado OK en puerto ${
            PUERTO || 3000
        }`
    );
});