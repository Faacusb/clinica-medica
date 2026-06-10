import PacientesService from "../services/pacientesService.js";
import { validationResult } from "express-validator";

export default class PacientesController {

    constructor() {
        this.pacientes = new PacientesService();
    }

    listarPacientes = async (req, res) => {
        try {

            const pacientes = await this.pacientes.listarPacientes();

            res.status(200).json({
                estado: "OK",
                data: pacientes
            });

        } catch (error) {

            console.error("ERROR: error al listar pacientes", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener la lista de pacientes"
            });
        }
    }

    obtenerPorId = async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const paciente = await this.pacientes.obtenerPorId(id);

            if (!paciente || paciente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Paciente con ID: ${id} no encontrado`
                });
            }

            res.status(200).json({
                estado: "OK",
                data: paciente
            });

        } catch (error) {

            console.error("ERROR: error al obtener paciente por ID", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener el paciente por ID"
            });
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

            res.status(201).json({
                estado: "OK",
                mensaje: "Paciente creado exitosamente",
                data: nuevoPaciente
            });

        } catch (error) {

            console.error("ERROR: error al crear paciente", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear el paciente"
            });
        }
    }

    editarPaciente = async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const pacienteExistente = await this.pacientes.obtenerPorId(id);

            if (!pacienteExistente || pacienteExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Paciente con ID: ${id} no encontrado`
                });
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

            res.status(200).json({
                estado: "OK",
                mensaje: "Paciente actualizado exitosamente",
                data: pacienteEditado
            });

        } catch (error) {

            console.error("ERROR: error al editar paciente", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar el paciente"
            });
        }
    }

}