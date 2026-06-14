import MedicosModel from "../database/medicosModel.js";

export default class MedicosService {

    constructor() {
        this.medicos = new MedicosModel();
    }

    listarMedicos = () => {
        return this.medicos.listarMedicos();
    }

    obtenerPorId = (id) => {
        return this.medicos.obtenerPorId(id);
    }

    crearMedico = (
        id_usuario,
        id_especialidad,
        matricula,
        valor_consulta,
        descripcion
    ) => {

        return this.medicos.crearMedico(
            id_usuario,
            id_especialidad,
            matricula,
            valor_consulta,
            descripcion
        );
    }

    editarMedico = (
        id,
        id_especialidad,
        valor_consulta,
        descripcion,
        matricula
    ) => {

        return this.medicos.editarMedico(
            id,
            id_especialidad,
            valor_consulta,
            descripcion,
            matricula
        );
    }

    eliminarMedico = (id) => {
        return this.medicos.eliminarMedico(id);
    }
}