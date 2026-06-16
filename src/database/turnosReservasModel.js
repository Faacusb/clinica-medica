import conexion from "../config/database.js";

export default class TurnosReservasModel {

    listarTurnos = async () => {

        const query = `
            SELECT 
                t.id_turno_reserva,
                t.fecha_hora,
                t.valor_total,
                t.atendido,
                t.activo,
                m.id_medico,
                u_m.apellido AS apellido_medico,
                u_m.nombres AS nombres_medico,
                e.nombre AS especialidad,
                p.id_paciente,
                u_p.apellido AS apellido_paciente,
                u_p.nombres AS nombres_paciente,
                os.nombre AS obra_social
            FROM turnos_reservas t
            INNER JOIN medicos m ON t.id_medico = m.id_medico
            INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN pacientes p ON t.id_paciente = p.id_paciente
            INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social;

        `;

        const [rows] = await conexion.execute(query);

        return rows;
    }

    obtenerPorId = async (id) => {

        const query = `
            SELECT 
                t.id_turno_reserva,
                t.fecha_hora,
                t.valor_total,
                t.atendido,
                m.id_medico,
                u_m.apellido AS apellido_medico,
                u_m.nombres AS nombres_medico,
                e.nombre AS especialidad,
                p.id_paciente,
                u_p.apellido AS apellido_paciente,
                u_p.nombres AS nombres_paciente,
                os.nombre AS obra_social
            FROM turnos_reservas t
            INNER JOIN medicos m ON t.id_medico = m.id_medico
            INNER JOIN usuarios u_m ON m.id_usuario = u_m.id_usuario
            INNER JOIN especialidades e ON m.id_especialidad = e.id_especialidad
            INNER JOIN pacientes p ON t.id_paciente = p.id_paciente
            INNER JOIN usuarios u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN obras_sociales os ON t.id_obra_social = os.id_obra_social
            WHERE t.id_turno_reserva = ?
            AND t.activo = 1
        `;
        const [rows] = await conexion.execute(query, [id]);

        return rows;
    }

    turnosDeUnMedico = async (id) => {
        const query = `
            SELECT
                tr.id_turno_reserva,
                tr.fecha_hora,
                tr.valor_total,
                tr.atendido,
                p.id_paciente,
                u_p.apellido AS apellido_paciente,
                u_p.nombres AS nombres_paciente,
                os.nombre AS obra_social,
                e.nombre AS especialidad
            FROM usuarios AS u
            INNER JOIN medicos AS m ON m.id_usuario = u.id_usuario
            INNER JOIN turnos_reservas AS tr ON tr.id_medico = m.id_medico
            INNER JOIN pacientes AS p ON tr.id_paciente = p.id_paciente
            INNER JOIN usuarios AS u_p ON p.id_usuario = u_p.id_usuario
            INNER JOIN obras_sociales AS os ON tr.id_obra_social = os.id_obra_social
            INNER JOIN especialidades AS e ON m.id_especialidad = e.id_especialidad
            WHERE u.id_usuario = ?
            AND u.activo = 1
            AND u_p.activo = 1
            AND tr.activo = 1
            ORDER BY tr.fecha_hora ASC
        `;

        const [turnos] = await conexion.execute(query, [id]);
        return turnos;
    }

    turnoPerteneceAMedico = async (id_turno_reserva, id_usuario) => {
        const query = `
            SELECT
                tr.id_turno_reserva
            FROM turnos_reservas AS tr
            INNER JOIN medicos AS m ON m.id_medico = tr.id_medico
            INNER JOIN usuarios AS u ON u.id_usuario = m.id_usuario
            WHERE tr.id_turno_reserva = ?
            AND u.id_usuario = ?
            AND tr.activo = 1
            AND u.activo = 1
        `;

        const [rows] = await conexion.execute(
            query,
            [
                id_turno_reserva,
                id_usuario
            ]
        );

        return rows;
    }

    turnosDeUnPaciente = async (id) => {
        const query = `
            SELECT
                tr.id_turno_reserva,
                tr.fecha_hora,
                tr.valor_total,
                tr.atendido,
                m.id_medico,
                u_m.apellido AS apellido_medico,
                u_m.nombres AS nombres_medico,
                os.nombre AS obra_social,
                e.nombre AS especialidad
            FROM usuarios AS u
            INNER JOIN pacientes AS p ON p.id_usuario = u.id_usuario
            INNER JOIN turnos_reservas AS tr ON tr.id_paciente = p.id_paciente
            INNER JOIN medicos AS m ON tr.id_medico = m.id_medico
            INNER JOIN usuarios AS u_m ON m.id_usuario = u_m.id_usuario
            INNER JOIN obras_sociales AS os ON tr.id_obra_social = os.id_obra_social
            INNER JOIN especialidades AS e ON m.id_especialidad = e.id_especialidad
            WHERE u.id_usuario = ?
            AND u.activo = 1
            AND u_m.activo = 1
            AND tr.activo = 1
            ORDER BY tr.fecha_hora ASC
        `;

        const [turnos] = await conexion.execute(query, [id]);
        return turnos;
    }

    crearTurno = async (turno) => {
        const {id_medico, id_paciente, id_obra_social, fecha_hora, valor_total} = turno;

        const query = `
            INSERT INTO turnos_reservas
            (
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atendido
            )
            VALUES (?, ?, ?, ?, ?, 0)
        `;

        const [result] = await conexion.execute(
            query,
            [
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total
            ]
        );

        if (result.affectedRows === 0){
            return null;
        }

        return result.insertId;
    }

    editarTurno = async (
    id,
    id_medico,
    id_paciente,
    id_obra_social,
    fecha_hora,
    valor_total
    ) => {
        const query = `
            UPDATE turnos_reservas
            SET
                id_medico = ?,
                id_paciente = ?,
                id_obra_social = ?,
                fecha_hora = ?,
                valor_total = ?
            WHERE id_turno_reserva = ?
            AND activo = 1
        `;

        const [result] = await conexion.execute(
            query,
            [
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return null;
        }

        return true;
    }

    marcarTurnoAtendido = async (id) => {
        const query = `
            UPDATE turnos_reservas
            SET atendido = 1
            WHERE id_turno_reserva = ?
            AND activo = 1
        `;

        const [result] = await conexion.execute(query, [id]);
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
