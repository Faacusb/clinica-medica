import express from "express";
import conexion from "./config/database.js";
import morgan from "morgan"; // 1. Morgan para el control y monitoreo de errores

const app = express();
app.use(express.json());
app.use(morgan('dev'));

/**
 * 1. LISTAR RELACIONES (Browse) - 
 * Hacemos JOINs para obtener, el nombre y apellido del medico y no solo el id.
 */
app.get('/medicos_obras_sociales', async (req, res) => {
    try {
        const query = `
            SELECT 
                mos.id_medico_obra_social,
                u.apellido AS medico_apellido,
                u.nombres AS medico_nombre, -- <--- Agregamos esta línea
                os.nombre AS obra_social_nombre,
                mos.activo
            FROM medicos_obras_sociales mos
            JOIN medicos m ON mos.id_medico = m.id_medico
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
            WHERE mos.activo = 1
        `;
        const [rows] = await conexion.execute(query);
        res.send({ 
            estado: "OK", 
            data: rows 
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({ estado: "ERROR", msg: "Error al obtener la lista" });
    }
});

// 2. Buscar por ID
app.get('/medicos_obras_sociales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT 
                mos.id_medico_obra_social,
                mos.id_medico,
                u.apellido AS medico_apellido,
                u.nombres AS medico_nombre,
                mos.id_obra_social,
                os.nombre AS obra_social_nombre,
                mos.activo
            FROM medicos_obras_sociales mos
            JOIN medicos m ON mos.id_medico = m.id_medico
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN obras_sociales os ON mos.id_obra_social = os.id_obra_social
            WHERE mos.id_medico_obra_social = ?
        `;
        
        const [rows] = await conexion.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).send({ 
                estado: "ERROR", 
                msg: "Relación médico-obra social no encontrada" 
            });
        }

        res.send({ 
            estado: "OK", 
            data: rows[0] 
        });

    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({ 
            estado: "ERROR", 
            msg: "Error al obtener el detalle de la relación" 
        });
    }
});

/**
 * 3. EDITAR
 */
app.put('/medicos_obras_sociales/:id', async (req, res) => {
    const { id_medico, id_obra_social, activo } = req.body;
    const { id } = req.params;
    try {
        await conexion.execute(
            "UPDATE medicos_obras_sociales SET id_medico = ?, id_obra_social = ?, activo = ? WHERE id_medico_obra_social = ?",
            [id_medico, id_obra_social, activo, id]
        );
        res.send({ estado: "OK", msg: "Relación actualizada" });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({ estado: "ERROR", msg: "Error al actualizar" });
    }
});

/**
 * 4. AGREGAR OBRA SOCIAL A UN MÉDICO
 */
app.post('/medicos_obras_sociales', async (req, res) => {
    const { id_medico, id_obra_social } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo) VALUES (?, ?, 1)",
            [id_medico, id_obra_social]
        );
        res.status(201).send({ estado: "OK", msg: "Obra social asignada al médico" });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({ estado: "ERROR", msg: "Error al asignar obra social" });
    }
});

/**
 * 5. ELIMINACIÓN LÓGICA (Delete)
 */
app.delete('/medicos_obras_sociales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await conexion.execute(
            "UPDATE medicos_obras_sociales SET activo = 0 WHERE id_medico_obra_social = ?",
            [id]
        );
        res.send({ estado: "OK", msg: "Relación desactivada" });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({ estado: "ERROR", msg: "Error al eliminar" });
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Médicos/Obras Sociales en puerto ${PORT}`);
});