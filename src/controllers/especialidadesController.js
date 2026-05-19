import EspecialidadesService from "../services/especialidadesService.js";

export default class EspecialidadesController {

    constructor() {
        this.especialidades = new EspecialidadesService();
    }

    listarEspecialidades = async (req, res) => {
        try {
            const especialidades = await this.especialidades.listarEspecialidades();
            res.status(200).json({
                estado: "OK",
                data: especialidades
            });
        } catch (error) {
            console.error("ERROR: error al listar especialidades",error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener la lista de especialidades"
            });
        }
    }

    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const especialidad = await this.especialidades.obtenerPorId(id);
            if (!especialidad || especialidad.length === 0){
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Especialidad con ID: ${id} no encontrada`
                });
            }
            res.status(200).json({
                estado: "OK",
                data: especialidad
            });
        } catch (error) {
            console.error("ERROR: error al obtener especialidad por ID",error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener la especialidad por ID"
            });
        }
    }

    crearEspecialidad = async (req, res) => {
        try {
            const { nombre } = req.body;
            const nuevaEspecialidad = await this.especialidades.crearEspecialidad(nombre);
            res.status(201).json({
                estado: "OK",
                mensaje: "Especialidad creada exitosamente",
                data: nuevaEspecialidad
            });
        } catch (error) {
            console.error("ERROR: error al crear especialidad",error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear la especialidad"
            });
        }
    }

    editarEspecialidad = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;
            const especialidadEditada = await this.especialidades.editarEspecialidad(id, nombre);
            if (especialidadEditada.affectedRows === 0) {
                return res.status(404).json({ estado: "ERROR", mensaje: `Especialidad con ID: ${id} no encontrada` });
            }
            res.status(200).json({
                estado: "OK",
                mensaje: "Especialidad actualizada exitosamente",
                data: especialidadEditada
            });
        } catch (error) {
            console.error("ERROR: error al editar especialidad",error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar la especialidad"
            });
        }
    }

    eliminarEspecialidad = async (req, res) => {
        try {
            const { id } = req.params;
            const especialidadEliminada = await this.especialidades.eliminarEspecialidad(id);
            if (especialidadEliminada.affectedRows === 0) {
                return res.status(404).json({ estado: "ERROR", mensaje: `Especialidad con ID: ${id} no encontrada` });
            }
            res.status(200).json({
                estado: "OK",
                mensaje: "Especialidad eliminada exitosamente"
            });
        } catch (error) {
            console.error("ERROR: error al eliminar especialidad",error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar la especialidad"
            });
        }
    }
}