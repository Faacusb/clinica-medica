import EspecialidadesModel from "../database/especialidadesModel.js";

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
            return await this.especialidades.obtenerPorId(nuevo_id);
    }

    editarEspecialidad = async (id, nombre) => {
            const modificado = await this.especialidades.editarEspecialidad(id, nombre);
            return await this.especialidades.obtenerPorId(id);
    }

    eliminarEspecialidad = async (id) => {
            const existe = await this.especialidades.obtenerPorId(id);
            return await this.especialidades.eliminarEspecialidad(id);
    }

}