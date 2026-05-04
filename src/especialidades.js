import express from "express";
import conexion from "./config/database.js";
import morgan from "morgan"; // 1. Morgan para el control y monitoreo de errores

const app = express();

app.use(express.json());
app.use(morgan('dev')); // 2. Inicia Morgan como Dev

// Lista todas las especialidades activas
app.get('/especialidades', async (req, res) => {
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM especialidades WHERE activo = 1"
        ); 
        res.send({
            estado: "OK",
            data :rows
        });
        console.table(rows);
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error); // 3. Modificado info precisa
        res.status(500).send({
            estado: "ERROR",
            msg: "No se pueden obtener las especialidades"
        });
    }
});

// Buscar por ID
app.get('/especialidades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM especialidades WHERE id_especialidad = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "Especialidad no encontrada"
            });
        } 
        res.send({
            estado: "OK",
            data :rows[0]
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            msg: "No se pueden obtener la especialidad"
        });
    }
});

// Editar especialidad
app.put('/especialidades/:id', async (req, res) => {
    const {nombre} = req.body; 
    const id = Number(req.params.id);
    
    try {
        const [result] = await conexion.execute(
            "UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?",
            [nombre, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "No existe esa especialidad"
            });
        }
        res.send({
            estado: "OK",
            msg: "Actualizada correctamente"
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
        });
    }
});

// Eliminar (Baja lógica)
app.delete ('/especialidades/:id', async (req, res) => {
    try {
        const { id } = req.params;     
        const [result] = await conexion.execute(
            "UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?",
            [id]
        );
        res.send({
            estado: "OK",
            msg: "Especialidad eliminada correctamente"
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            msg: "No se pudo eliminar la especialidad"
        });
    }
});

// Crear especialidad
const crearEspecialidad = async (req, res) => {
    const { nombre } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO especialidades (nombre) VALUES (?)",
            [nombre]
        );
        res.send({
            estado: "OK",
            msg: "Especialidad creada correctamente"
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            msg: "No se pudo crear la especialidad"
        });
    }
};

app.post('/especialidades', crearEspecialidad);

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});