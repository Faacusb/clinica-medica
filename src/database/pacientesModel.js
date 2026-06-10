import conexion from "../config/database.js";

export default class PacientesModel {

    listarPacientes = async () => {

        const query = `         
            SELECT
                p.id_paciente,
                p.id_usuario,
                u.documento,
                u.apellido,
                u.nombres,
                u.email,
                p.id_obra_social
            FROM pacientes p
            INNER JOIN usuarios u
                ON p.id_usuario = u.id_usuario
            WHERE u.activo = 1
        `;

        const [rows] = await conexion.execute(query);

        return rows;
    }

    obtenerPorId = async (id) => {

        const query = `
            SELECT
                p.id_paciente,
                p.id_usuario,
                u.documento,
                u.apellido,
                u.nombres,
                u.email,
                p.id_obra_social
            FROM pacientes p
            INNER JOIN usuarios u
                ON p.id_usuario = u.id_usuario
            WHERE p.id_paciente = ?
            AND u.activo = 1
        `;

        const [rows] = await conexion.execute(query, [id]);

        return rows;
    }

    crearPaciente = async (
        id_usuario,
        id_obra_social
    ) => {

        const query = `
            INSERT INTO pacientes
            (
                id_usuario,
                id_obra_social
            )
            VALUES (?, ?)
        `;

        const [result] = await conexion.execute(
            query,
            [id_usuario, id_obra_social]
        );

        return result;
    }

    editarPaciente = async (
        id,
        id_usuario,
        id_obra_social
    ) => {

        const query = `
            UPDATE pacientes
            SET
                id_usuario = ?,
                id_obra_social = ?
            WHERE id_paciente = ?
        `;

        const [result] = await conexion.execute(
            query,
            [id_usuario, id_obra_social, id]
        );

        return result;
    }

 
}

// No se implementó un DELETE para Pacientes porque la baja lógica se realiza sobre
// la entidad Usuario (campo activo). Dado que todo paciente es un usuario, al
// desactivar el usuario asociado el paciente deja automáticamente de estar
// disponible en las consultas. Esto evita redundancia de datos y mantiene la
// integridad del modelo.