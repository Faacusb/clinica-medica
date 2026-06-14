import conexion from "../config/database.js";
export default class  MedicosObrasSocialesModel{

    listarMedicosObrasSociales = async () => {

        const query = `
            SELECT
                mos.id_medico_obra_social,
                u.apellido AS medico_apellido,
                u.nombres AS medico_nombre,
                os.nombre AS obra_social_nombre,
                mos.activo
            FROM medicos_obras_sociales mos
            JOIN medicos m
                ON mos.id_medico = m.id_medico
            JOIN usuarios u
                ON m.id_usuario = u.id_usuario
            JOIN obras_sociales os
                ON mos.id_obra_social = os.id_obra_social
            WHERE mos.activo = 1
        `;
        const [rows] =
            await conexion.execute(query);

        return rows;
    };
    obtenerPorId = async (id) => {

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
            JOIN medicos m
                ON mos.id_medico = m.id_medico
            JOIN usuarios u
                ON m.id_usuario = u.id_usuario
            JOIN obras_sociales os
                ON mos.id_obra_social = os.id_obra_social
            WHERE mos.id_medico_obra_social = ?
        `;

        const [rows] =
            await conexion.execute(query, [id]);

        return rows;
    };
    crearMedicoObraSocial = async (
        id_medico,
        id_obra_social
    ) => {
        const query = `
            INSERT INTO medicos_obras_sociales
            (
                id_medico,
                id_obra_social
            )
            VALUES (?, ?)
        `;
        const [result] =
            await conexion.execute(
                query,
                [
                    id_medico,
                    id_obra_social
                ]
            );

        return result;
    };
    editarMedicoObraSocial = async (
        id,
        id_medico,
        id_obra_social
    ) => {
        const query = `
            UPDATE medicos_obras_sociales
            SET
                id_medico = ?,
                id_obra_social = ?
            WHERE id_medico_obra_social = ?
        `;
        const [result] =
            await conexion.execute(
                query,
                [
                    id_medico,
                    id_obra_social,
                    id
                ]
            );

        return result;
    };
    eliminarMedicoObraSocial = async (id) => {

        const [relacion] =
            await conexion.execute(
                `
                SELECT id_medico_obra_social
                FROM medicos_obras_sociales
                WHERE id_medico_obra_social = ?
                `,
                [id]
            );
        if (relacion.length === 0) {
            return null;
        }
        const [result] =
            await conexion.execute(
                `
                UPDATE medicos_obras_sociales
                SET activo = 0
                WHERE id_medico_obra_social = ?
                `,
                [id]
            );
        return result;
    };
}