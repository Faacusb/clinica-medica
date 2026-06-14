import PacientesModel from "../database/pacientesModel.js";
import apicache from "apicache";

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

    crearPaciente = async (
        id_usuario,
        id_obra_social
    ) => {

        const creado = await this.pacientes.crearPaciente(
            id_usuario,
            id_obra_social
        );
        apicache.clear();
        return creado;

    }

    editarPaciente = async (
        id,
        id_usuario,
        id_obra_social
    ) => {

        const modificado = await this.pacientes.editarPaciente(
            id,
            id_usuario,
            id_obra_social
        );
        apicache.clear();
        return modificado;
    }
}