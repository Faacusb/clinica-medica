import conexion from "../config/database.js";

export default class MedicosModel {

    listarMedicos = async () => {
        const query = "SELECT * FROM v_medicos";
        const [rows] = await conexion.execute(query);
        return rows;
    }

    obtenerPorId = async (id) => {
        const query = `
            SELECT 
                m.id_medico,
                m.id_usuario,
                m.id_especialidad,
                m.matricula,
                m.descripcion,
                m.valor_consulta,
                u.apellido,
                u.nombres,
                u.documento,
                u.email,
                e.nombre AS nombre_especialidad
            FROM medicos m
            INNER JOIN usuarios u ON m.id_usuario = u.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            WHERE m.id_medico = ?
            AND u.activo = 1
        `;

        const [rows] = await conexion.execute(query, [id]);
        return rows;
    }

    crearMedico = async (
        id_usuario,
        id_especialidad,
        matricula,
        valor_consulta,
        descripcion
    ) => {
        const query = `
            INSERT INTO medicos
            (
                id_usuario,
                id_especialidad,
                matricula,
                valor_consulta,
                descripcion
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await conexion.execute(query, [
            id_usuario,
            id_especialidad,
            matricula,
            valor_consulta,
            descripcion
        ]);

        return result.insertId;
    }

    editarMedico = async (
        id,
        id_especialidad,
        valor_consulta,
        descripcion,
        matricula
    ) => {
        const query = `
            UPDATE medicos
            SET
                id_especialidad = ?,
                valor_consulta = ?,
                descripcion = ?,
                matricula = ?
            WHERE id_medico = ?
        `;

        const [result] = await conexion.execute(query, [
            id_especialidad,
            valor_consulta,
            descripcion,
            matricula,
            id
        ]);

        return id;
    }

    eliminarMedico = async (id) => {
        const [medico] = await conexion.execute(
            "SELECT id_usuario FROM medicos WHERE id_medico = ?",
            [id]
        );

        if (medico.length === 0) {
            return null;
        }

        const [result] = await conexion.execute(
            "UPDATE usuarios SET activo = 0 WHERE id_usuario = ?",
            [medico[0].id_usuario]
        );

        return result;
    }
}