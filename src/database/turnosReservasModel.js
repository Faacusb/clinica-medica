import conexion from "../config/database.js";

export default class TurnosReservasModel {

    listarTurnos = async () => {

        const query = `
            SELECT *
            FROM turnos_reservas
            WHERE activo = 1
        `;

        const [rows] = await conexion.execute(query);

        return rows;
    }

    obtenerPorId = async (id) => {

        const query = `
            SELECT *
            FROM turnos_reservas
            WHERE id_turno_reserva = ?
            AND activo = 1
        `;

        const [rows] = await conexion.execute(query, [id]);

        return rows;
    }

    crearTurno = async (
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido,
        activo
    ) => {

        const query = `
            INSERT INTO turnos_reservas
            (
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await conexion.execute(
            query,
            [
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            ]
        );

        return result;
    }

    editarTurno = async (
        id,
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido,
        activo
    ) => {

        const query = `
            UPDATE turnos_reservas
            SET
                id_medico = ?,
                id_paciente = ?,
                id_obra_social = ?,
                fecha_hora = ?,
                valor_total = ?,
                atentido = ?,
                activo = ?
            WHERE id_turno_reserva = ?
        `;

        const [result] = await conexion.execute(
            query,
            [
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo,
                id
            ]
        );

        return result;
    }

    eliminarTurno = async (id) => {

        const query = `
            UPDATE turnos_reservas
            SET activo = 0
            WHERE id_turno_reserva = ?
        `;

        const [result] = await conexion.execute(
            query,
            [id]
        );

        return result;
    }
}
