import TurnosReservasModel from "../database/turnosReservasModel.js";
import MedicosService from "./medicosService.js";
import PacientesService from "./pacientesService.js";
import ObrasSocialesService from "./obrasSocialesService.js";
import apicache from "apicache";


export default class TurnosReservasService{

    constructor() {
        this.turnos = new TurnosReservasModel();
        this.medicos = new MedicosService();
        this.pacientes = new PacientesService();
        this.obrasSociales = new ObrasSocialesService();
    }


    listarTurnos = () => {
        return this.turnos.listarTurnos();
    }

    obtenerPorId = (id) => {
        return this.turnos.obtenerPorId(id);
    }


    buscarTurnosUsuario = async (usuario) => {
        if (usuario.rol === 1) {
            return this.turnos.turnosDeUnMedico(usuario.id_usuario);
        }

        if (usuario.rol === 2) {
            return this.turnos.turnosDeUnPaciente(usuario.id_usuario);
        }
        
        apicache.clear();
        return [];
    }

   crearTurno = async (turno) => {
        const { id_medico, id_paciente, fecha_hora } = turno;

        const medicoRows = await this.medicos.obtenerPorId(id_medico);
        const pacienteRows = await this.pacientes.obtenerPorId(id_paciente);

        const medico = medicoRows[0];
        const paciente = pacienteRows[0];

        if (!medico) {
            throw new Error(`Medico con id ${id_medico} no encontrado`);
        }

        if (!paciente) {
            throw new Error(`Paciente con id ${id_paciente} no encontrado`);
        }

        const obraSocialRows = await this.obrasSociales.obtenerPorId(paciente.id_obra_social);
        const obraSocial = obraSocialRows[0];

        if (!obraSocial) {
            throw new Error(`Obra social con id ${paciente.id_obra_social} no encontrada`);
        }

        const valorConsulta = Number(medico.valor_consulta);
        const porcentajeDescuento = Number(obraSocial.porcentaje_descuento);

        let valorTotal = valorConsulta;

        if (Number(obraSocial.es_particular) === 0) {
            valorTotal = valorConsulta - (porcentajeDescuento * valorConsulta);
        }

        const turnoCompleto = {
            id_medico,
            id_paciente,
            id_obra_social: paciente.id_obra_social,
            fecha_hora,
            valor_total: valorTotal
        };

        const idNuevoTurno = await this.turnos.crearTurno(turnoCompleto);

        if (!idNuevoTurno) {
            throw new Error("No se pudo crear el turno");
        }

        const turnoCreadoRows = await this.turnos.obtenerPorId(idNuevoTurno);
        const turnoCreado = turnoCreadoRows[0];

        if (!turnoCreado) {
            throw new Error("El turno fue creado, pero no se pudo recuperar");
        }

        apicache.clear();
        return turnoCreado;
    }


    editarTurno = async (id, turno) => {
        const { id_medico, id_paciente, fecha_hora } = turno;

        const turnoExistenteRows = await this.turnos.obtenerPorId(id);
        const turnoExistente = turnoExistenteRows[0];

        if (!turnoExistente) {
            throw new Error(`Turno con id ${id} no encontrado`);
        }

        const medicoRows = await this.medicos.obtenerPorId(id_medico);
        const pacienteRows = await this.pacientes.obtenerPorId(id_paciente);

        const medico = medicoRows[0];
        const paciente = pacienteRows[0];

        if (!medico) {
            throw new Error(`Medico con id ${id_medico} no encontrado`);
        }

        if (!paciente) {
            throw new Error(`Paciente con id ${id_paciente} no encontrado`);
        }

        const obraSocialRows = await this.obrasSociales.obtenerPorId(paciente.id_obra_social);
        const obraSocial = obraSocialRows[0];

        if (!obraSocial) {
            throw new Error(`Obra social con id ${paciente.id_obra_social} no encontrada`);
        }

        const valorConsulta = Number(medico.valor_consulta);
        const porcentajeDescuento = Number(obraSocial.porcentaje_descuento) / 100;

        let valorTotal = valorConsulta;

        if (Number(obraSocial.es_particular) === 0) {
            valorTotal = valorConsulta - (porcentajeDescuento * valorConsulta);
        }

        const actualizado = await this.turnos.editarTurno(
            id,
            id_medico,
            id_paciente,
            paciente.id_obra_social,
            fecha_hora,
            valorTotal
        );

        if (!actualizado) {
            throw new Error(`No se pudo editar el turno con id ${id}`);
        }

        const turnoActualizadoRows = await this.turnos.obtenerPorId(id);
        const turnoActualizado = turnoActualizadoRows[0];

        if (!turnoActualizado) {
            throw new Error("El turno fue editado, pero no se pudo recuperar");
        }

        apicache.clear();
        return turnoActualizado;
    }


    marcarTurnoAtendido = async (id, usuario) => {
        if (usuario.rol !== 1) {
            throw new Error("Solo un medico puede marcar turnos como atendidos");
        }

        const turnoRows = await this.turnos.obtenerPorId(id);
        const turno = turnoRows[0];

        if (!turno) {
            throw new Error(`Turno con id ${id} no encontrado`);
        }

        const perteneceRows = await this.turnos.turnoPerteneceAMedico(id, usuario.id_usuario);
        const pertenece = perteneceRows[0];

        if (!pertenece) {
            throw new Error("El turno no pertenece al medico autenticado");
        }

        const actualizado = await this.turnos.marcarTurnoAtendido(id);

        if (actualizado.affectedRows === 0) {
            throw new Error("No se pudo marcar el turno como atendido");
        }

        apicache.clear();

        return this.turnos.obtenerPorId(id);
    }
    

    eliminarTurno = (id) => {
        return this.turnos.eliminarTurno(id);
    }
}
