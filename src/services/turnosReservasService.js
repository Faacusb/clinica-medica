import TurnosReservasModel from "../database/turnosReservasModel.js";

export default class TurnosReservasService {

    constructor() {
        this.turnos = new TurnosReservasModel();
    }

    listarTurnos = () => {
        return this.turnos.listarTurnos();
    }

    obtenerPorId = (id) => {
        return this.turnos.obtenerPorId(id);
    }

    crearTurno = (
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido,
        activo
    ) => {
        return this.turnos.crearTurno(
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido,
            activo
        );
    }

    editarTurno = (
        id,
        id_medico,
        id_paciente,
        id_obra_social,
        fecha_hora,
        valor_total,
        atentido,
        activo
    ) => {
        return this.turnos.editarTurno(
            id,
            id_medico,
            id_paciente,
            id_obra_social,
            fecha_hora,
            valor_total,
            atentido,
            activo
        );
    }

    eliminarTurno = (id) => {
        return this.turnos.eliminarTurno(id);
    }
}
