import MedicosModel from "../database/medicosModel.js";
import apicache from "apicache";

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

    crearMedico = async (
        id_usuario,
        id_especialidad,
        matricula,
        valor_consulta,
        descripcion
    ) => {
        const creado = await this.medicos.crearMedico(
            id_usuario,
            id_especialidad,
            matricula,
            valor_consulta,
            descripcion
        );
        apicache.clear(); 
        return creado
    }

    editarMedico = async (
        id,
        id_especialidad,
        valor_consulta,
        descripcion,
        matricula
    ) => {
        const editado = await this.medicos.editarMedico(
            id,
            id_especialidad,
            valor_consulta,
            descripcion,
            matricula
        );
        apicache.clear(); 
        return editado
    }

    eliminarMedico = async (id) => {
        const eliminado = await this.medicos.eliminarMedico(id);
        apicache.clear();        
        return eliminado
    }
}