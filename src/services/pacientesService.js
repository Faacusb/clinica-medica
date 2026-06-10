import PacientesModel from "../database/pacientesModel.js";

export default class PacientesService {

    constructor() {
        this.pacientes = new PacientesModel();
    }

    listarPacientes = () => {
        return this.pacientes.listarPacientes();
    }

    obtenerPorId = (id) => {
        return this.pacientes.obtenerPorId(id);
    }

    crearPaciente = (
        id_usuario,
        id_obra_social
    ) => {

        return this.pacientes.crearPaciente(
            id_usuario,
            id_obra_social
        );
    }

    editarPaciente = (
        id,
        id_usuario,
        id_obra_social
    ) => {

        return this.pacientes.editarPaciente(
            id,
            id_usuario,
            id_obra_social
        );
    }

}