import MedicosService from "../services/medicosService.js";
import { validationResult } from "express-validator";
import JSendResponse from "../utils/JSendResponse.js";

export default class MedicosController {

    constructor() {
        this.medicos = new MedicosService();
    }

    listarMedicos = async (req, res) => {
        try {
            const data = await this.medicos.listarMedicos();

            res.status(200).json(JSendResponse.success(data));

        } catch (error) {
            console.error("ERROR: error al listar médicos:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener la lista de médicos"));
        }
    }

    obtenerPorId = async (req, res) => {

        try {
            const { id } = req.params;

            const medico = await this.medicos.obtenerPorId(id);

            if (!medico || medico.length === 0) {
                return res.status(404).json(JSendResponse.error(`Médico con ID: ${id} no encontrado`));
            }

            res.status(200).json(JSendResponse.success(medico[0]));

        } catch (error) {
            console.error("ERROR: error al obtener médico:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener el médico por ID"));
        }
    }

    crearMedico = async (req, res) => {
        try {
            const {
                id_usuario,
                id_especialidad,
                matricula,
                valor_consulta,
                descripcion
            } = req.body;

            const nuevoMedico = await this.medicos.crearMedico(
                id_usuario,
                id_especialidad,
                matricula,
                valor_consulta,
                descripcion
            );

            res.status(201).json(JSendResponse.success(nuevoMedico));

        } catch (error) {
            console.error("ERROR: error al crear médico:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al crear el médico"));
        }
    }

    editarMedico = async (req, res) => {
        try {
            const { id } = req.params;

            const medicoExistente = await this.medicos.obtenerPorId(id);

            if (!medicoExistente || medicoExistente.length === 0) {
                return res.status(404).json(JSendResponse.fail("Médico con ID: ${id} no encontrado"));
            }

            const {
                id_especialidad,
                valor_consulta,
                descripcion,
                matricula
            } = req.body;

            const medicoEditado = await this.medicos.editarMedico(
                id,
                id_especialidad,
                valor_consulta,
                descripcion,
                matricula
            );

            res.status(200).json(JSendResponse.success(medicoEditado));

        } catch (error) {
            console.error("ERROR: error al editar médico:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al editar el médico"));
        }
    }

    eliminarMedico = async (req, res) => {
        try {
            const { id } = req.params;
            const medico = await this.medicos.obtenerPorId(id);

            if (!medico || medico.length === 0){
                return res.status(404).json(JSendResponse.fail(`Médico con ID: ${id} no encontrado`));}
            const result = await this.medicos.eliminarMedico(id);

            res.status(200).json(JSendResponse.success("Médico eliminado exitosamente"));

        } catch (error) {
            console.error("ERROR: error al eliminar médico:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al eliminar el médico"));
        }
    }

    asociarMedicoObrasSociales = async (req, res) => {
    try {
        const { id } = req.params;
        const { obras_sociales } = req.body;

        const medico = await this.medicos.obtenerPorId(id);

        if (!medico || medico.length === 0) {
            return res.status(404).json(
                JSendResponse.fail({ medico: `Médico con ID ${id} no encontrado` })
            );
        }

        const asociado = await this.medicos.asociarMedicoObrasSociales(id, obras_sociales);

        if (asociado  === 0) {
            return res.status(200).json(
                JSendResponse.success({ mensaje: `No se agregaron nuevas obras sociales al médico con ID ${id}` })
            );
        }

        res.status(200).json(
            JSendResponse.success({ mensaje: `Se asociaron ${asociado} obras sociales al médico con ID ${id}` })
        );


    } catch (error) {
        console.error("ERROR: error al asociar obras sociales al médico:", error);
        res.status(500).json(
            JSendResponse.error("Error interno del servidor al asociar obras sociales al médico")
        );
    }
}


    listarObrasSocialesPorMedico = async (req, res) => {
        try {
            const { id } = req.params;

            const medico = await this.medicos.obtenerPorId(id);

            if (!medico || medico.length === 0) {
            return res.status(404).json(
                JSendResponse.fail({ medico: `Médico con ID ${id} no encontrado` })
            );
        }
        
            const obras_sociales = await this.medicos.listarObrasSocialesPorMedico(id);
            res.status(200).json(JSendResponse.success(obras_sociales));
        } catch (error) {
            console.error("ERROR: error al listar las obras sociales por médico:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al listar las obras sociales por médico"));
        }
    }

    listarMedicosPorEspecialidad = async (req, res) => {
        try {
            const { id } = req.params;

            const medicos = await this.medicos.listarMedicosPorEspecialidad(id);

            if (medicos.length === 0) {
                return res.status(404).json(JSendResponse.fail(`No se encontraron médicos para la especialidad con ID ${id}`));
            }
            
            res.status(200).json(JSendResponse.success(medicos));
        } catch (error) {
            console.error("ERROR: error al listar médicos por especialidad:", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al listar médicos por especialidad"));
        }
    }
}