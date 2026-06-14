import EspecialidadesModel from "../database/especialidadesModel.js";
import apicache from "apicache";
export default class EspecialidadesService {

    constructor(){
        this.especialidades = new EspecialidadesModel();
    }

    listarEspecialidades = () => {
        return this.especialidades.listarEspecialidades(); 
    }

    obtenerPorId = (id) => {
            return this.especialidades.obtenerPorId(id);
    }

    crearEspecialidad = async (nombre) => {
            const nuevo_id = await this.especialidades.crearEspecialidad(nombre);
            apicache.clear();
            return await this.especialidades.obtenerPorId(nuevo_id);
    }

    editarEspecialidad = async (id, nombre) => {
            const modificado = await this.especialidades.editarEspecialidad(id, nombre);
            apicache.clear();
            return await this.especialidades.obtenerPorId(id);
    }

    eliminarEspecialidad = async (id) => {
            const eliminado = await this.especialidades.eliminarEspecialidad(id);
            apicache.clear();
            return eliminado;
    }

}