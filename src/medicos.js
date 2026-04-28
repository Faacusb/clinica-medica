import express from "express";
import conexion from "./config/database.js";
import morgan from "morgan"; //Importa Morgan para control y monitoreo de errores

const app = express();
app.use(express.json());
app.use(morgan('dev'));

/**
 * 1. LISTAR TODOS LOS MÉDICOS
 * Para el listado general, aprovechamos el objeto predefinido en la DB v_medicos.
 */
app.get('/medicos', async (req, res) => {
    try {
        // SELECT * de la vista es seguro aquí porque solo queremos los datos básicos
        const [rows] = await conexion.execute("SELECT * FROM v_medicos");
        res.json({
            estado: "OK",
            data: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: "ERROR", msg: "Error al obtener la lista desde la Vista" });
    }
});

/**
 * 2. OBTENER DETALLE COMPLETO (Read / Expandido)
 * Como la Vista 'v_medicos' no incluye campos como'valor_consulta'
 * o 'descripcion', aquí "expandimos" la búsqueda.
 */
app.get('/medicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT 
                m.*, 
                u.apellido, u.nombres, u.documento, u.email,
                e.nombre AS nombre_especialidad
            FROM medicos m
            JOIN usuarios u ON m.id_usuario = u.id_usuario
            JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_medico = ? AND u.activo = 1
        `;
        const [rows] = await conexion.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ estado: "ERROR", msg: "Médico no encontrado" });
        }
        res.json({
            estado: "OK",
            data: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: "ERROR", msg: "Error al obtener el detalle expandido" });
    }
});

/**
 * 3. CREAR MÉDICO
 * FALTAN LAS VALIDACIONES
 */
app.post('/medicos', async (req, res) => {
    const { id_usuario, id_especialidad, matricula, valor_consulta, descripcion } = req.body;
    try {
        const [result] = await conexion.execute(
            "INSERT INTO medicos (id_usuario, id_especialidad, matricula, valor_consulta, descripcion) VALUES (?, ?, ?, ?, ?)",
            [id_usuario, id_especialidad, matricula, valor_consulta, descripcion]
        );
        res.status(201).json({ estado: "OK", msg: "Médico creado", id: result.insertId });
    } catch (error) {
        res.status(500).json({ estado: "ERROR", msg: "Error al crear médico" });
    }
});

/**
 * 4. ACTUALIZAR MÉDICO
 */
app.put('/medicos/:id', async (req, res) => {
    const { id } = req.params;
    const { id_especialidad, valor_consulta, descripcion, matricula } = req.body;
    try {
        await conexion.execute(
            "UPDATE medicos SET id_especialidad = ?, valor_consulta = ?, descripcion = ?, matricula = ? WHERE id_medico = ?",
            [id_especialidad, valor_consulta, descripcion, matricula, id]
        );
        res.json({ estado: "OK", msg: "Médico actualizado" });
    } catch (error) {
        res.status(500).json({ estado: "ERROR", msg: "Error al actualizar" });
    }
});

/**
 * 5. DAR DE BAJA (Soft Delete)
 * POR QUÉ: No borramos el registro de la tabla 'medicos' para no perder historial de turnos.
 * Desactivamos al usuario vinculado (activo = 0), lo que automáticamente lo quita 
 * de nuestras listas de arriba gracias al WHERE u.activo = 1.
 */
app.delete('/medicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [medico] = await conexion.execute("SELECT id_usuario FROM medicos WHERE id_medico = ?", [id]);
        if (medico.length === 0) return res.status(404).json({ estado: "ERROR", msg: "No existe" });

        await conexion.execute("UPDATE usuarios SET activo = 0 WHERE id_usuario = ?", [medico[0].id_usuario]);
        res.json({ estado: "OK", msg: "Médico desactivado del sistema" });
    } catch (error) {
        res.status(500).json({ estado: "ERROR", msg: "Error al dar de baja" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor de Médicos escuchando en http://localhost:${PORT}`);
});