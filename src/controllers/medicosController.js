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
}