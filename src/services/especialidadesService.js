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
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }

            return this.especialidades.obtenerPorId(id);

        } catch (error) {

            console.error("ERROR: error en especialidadesService al obtener especialidad por ID",error);
            throw new Error("Error al obtener la especialidad por ID");
        }
    }

    crearEspecialidad = (nombre) => {
        try {
            return this.especialidades.crearEspecialidad(nombre);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al crear especialidad",error);
            throw new Error("Error al crear la especialidad");
        }
    }

    editarEspecialidad = (id, nombre) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            return this.especialidades.editarEspecialidad(id, nombre);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al editar especialidad",error);
            throw new Error("Error al editar la especialidad");
        }
    }

    eliminarEspecialidad = (id) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            return this.especialidades.eliminarEspecialidad(id);
        } catch (error) {
            console.error("ERROR: error en especialidadesService al eliminar especialidad",error);
            throw new Error("Error al eliminar la especialidad");
        }
    }

}