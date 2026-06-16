import PacientesService from "../services/pacientesService.js";
import { validationResult } from "express-validator";
import JSendResponse from "../utils/JSendResponse.js";

export default class PacientesController {

    constructor() {
        this.pacientes = new PacientesService();
    }

    listarPacientes = async (req, res) => {
        try {
            const pacientes = await this.pacientes.listarPacientes();
            res.status(200).json(JSendResponse.success(pacientes));
        } catch (error) {
            console.error("ERROR: error al listar pacientes", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al listar pacientes"));
        }
    }

    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const paciente = await this.pacientes.obtenerPorId(id);

            if (!paciente || paciente.length === 0) {
                return res.status(404).json(JSendResponse.fail(`Médico con ID ${id} no encontrado`));
            }

            res.status(200).json(JSendResponse.success(paciente));
        } catch (error) {
            console.error("ERROR: error al obtener paciente por ID", error);
            res.status(500).json(JSendResponse.error("Error interno en el servidor al obtener paciente por ID"));
        }
    }

    crearPaciente = async (req, res) => {
        try {
            const {
                id_usuario,
                id_obra_social
            } = req.body;

            const nuevoPaciente = await this.pacientes.crearPaciente(
                id_usuario,
                id_obra_social
            );

            res.status(201).json(JSendResponse.success(nuevoPaciente));
        } catch (error) {
            console.error("ERROR: error al crear paciente", error);
            res.status(500).json(JSendResponse.error("Erros interno del servidor al crear paciente"));
        }
    }

    editarPaciente = async (req, res) => {
        try {
            const { id } = req.params;

            const pacienteExistente = await this.pacientes.obtenerPorId(id);

            if (!pacienteExistente || pacienteExistente.length === 0) {
                return res.status(404).json(JSendResponse.fail(`Médico con ID ${id} no encontrado`));
            }

            const {
                id_usuario,
                id_obra_social
            } = req.body;

            const pacienteEditado = await this.pacientes.editarPaciente(
                id,
                id_usuario,
                id_obra_social
            );

            res.status(200).json(JSendResponse.success(pacienteEditado));
        } catch (error) {
            console.error("ERROR: error al editar paciente", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al editar paciente"));
        }
    }

}