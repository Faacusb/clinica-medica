import EspecialidadesModel from "../database/especialidadesModel.js";

export default class EspecialidadesService {

    constructor(){
        this.especialidades = new EspecialidadesModel();
    }

    listarEspecialidades = () => {
        try {
            return this.especialidades.listarEspecialidades();
        } catch (error) {
            console.error("ERROR: error en especialidadesService al listar especialidades",error);
            throw new Error("Error al obtener la lista de especialidades");
        }
        
    }

    obtenerPorId = (id) => {
        try {
            return this.especialidades.obtenerPorId(id);

        } catch (error) {

            console.error("ERROR: error en especialidadesService al obtener especialidad por ID",error);
            throw new Error("Error al obtener la especialidad por ID");
        }
    }

    crearEspecialidad = async (nombre) => {
        try {
            const nuevo_id = await this.especialidades.crearEspecialidad(nombre);
            return await this.especialidades.obtenerPorId(nuevo_id);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al crear especialidad",error);
            throw new Error("Error al crear la especialidad");
        }
    }

    editarEspecialidad = async (id, nombre) => {
        try {
            const modificado = await this.especialidades.editarEspecialidad(id, nombre);
            return await this.especialidades.obtenerPorId(id);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al editar especialidad",error);
            throw new Error("Error al editar la especialidad");
        }
    }

    eliminarEspecialidad = async (id) => {
        try {
            const existe = await this.especialidades.obtenerPorId(id);
            if (!existe || existe.length === 0) {
                throw new Error(`No se encontró una especialidad con ID: ${id}`);
            }
            return await this.especialidades.eliminarEspecialidad(id);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al eliminar especialidad",error);
            throw new Error("Error al eliminar la especialidad");
        }
    }

}