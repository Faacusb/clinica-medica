import EspecialidadesService from "../services/especialidadesService.js";
import JSendResponse from "../utils/JSendResponse.js";

export default class EspecialidadesController {

    constructor() {
        this.especialidades = new EspecialidadesService();
    }

    listarEspecialidades = async (req, res) => {
        try {
            const especialidades = await this.especialidades.listarEspecialidades();
            res.status(200).json(JSendResponse.success(especialidades));
        } catch (error) {
            console.error("ERROR: error al listar especialidades",error);
            res.status(500).json(JSendResponse.error("Error al obtener la lista de especialidades"));
        }
    }

    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const especialidad = await this.especialidades.obtenerPorId(id);
            if (!especialidad || especialidad.length === 0){
                return res.status(404).json(JSendResponse.fail(`Especialidad con ID: ${id} no encontrada`));
            }
            res.status(200).json(JSendResponse.success(especialidad));
        } catch (error) {
            console.error("ERROR: error al obtener especialidad por ID",error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener la especialidad por ID"));
        }
    }

    crearEspecialidad = async (req, res) => {
        try {
            const { nombre } = req.body;
            const nuevaEspecialidad = await this.especialidades.crearEspecialidad(nombre);
            
            res.status(201).json(JSendResponse.success(nuevaEspecialidad));
        } catch (error) {
            console.error("ERROR: error al crear especialidad",error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al crear la especialidad"));
        }
    }

    editarEspecialidad = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const especialidadEditada = await this.especialidades.editarEspecialidad(id, nombre);
            
            res.status(200).json(JSendResponse.success(especialidadEditada));
        } catch (error) {
            console.error("ERROR: error al editar especialidad",error);

            // Si es un error de validación o salón no encontrado, devolver fail
            if (error.message.includes('No se encontró')) {
                return res.status(404).json(JSendResponse.fail({
                    especialidad: error.message
                }));
            }

            if (error.message.includes('Ya existe') || error.message.includes('debe ser mayor') || error.message.includes('ID inválido')) {
                return res.status(400).json(JSendResponse.fail({ 
                    validation: error.message 
                }));
            }
            
            res.status(500).json(JSendResponse.error("Error interno del servidor al editar la especialidad"));
        }
    }

    eliminarEspecialidad = async (req, res) => {
        try {
            const { id } = req.params;
            const especialidadEliminada = await this.especialidades.eliminarEspecialidad(id);
            if (especialidadEliminada.affectedRows === 0) {
                return res.status(404).json(JSendResponse.fail(`Especialidad con ID: ${id} no encontrada`));
            }
            res.status(200).json(JSendResponse.success({ 
                message: `Especialidad con ID: ${id} eliminada exitosamente`
            }));
        } catch (error) {
            console.error("ERROR: error al eliminar especialidad",error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al eliminar la especialidad"));
            };
        }
}
