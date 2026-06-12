import MedicosService from "../services/medicosService.js";
import { validationResult } from "express-validator";

export default class MedicosController {

    constructor() {
        this.medicos = new MedicosService();
    }

    listarMedicos = async (req, res) => {
        try {
            const data = await this.medicos.listarMedicos();

            res.status(200).json({
                estado: "OK",
                data
            });

        } catch (error) {
            console.error("ERROR al listar médicos:", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener la lista de médicos"
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

            const medico = await this.medicos.obtenerPorId(id);

            if (!medico || medico.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Médico con ID: ${id} no encontrado`
                });
            }

            res.status(200).json({
                estado: "OK",
                data: medico[0]
            });

        } catch (error) {
            console.error("ERROR al obtener médico:", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener el médico"
            });
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

            res.status(201).json({
                estado: "OK",
                mensaje: "Médico creado exitosamente",
                data: nuevoMedico
            });

        } catch (error) {
            console.error("ERROR al crear médico:", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear médico"
            });
        }
    }

    editarMedico = async (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {
            const { id } = req.params;

            const medicoExistente = await this.medicos.obtenerPorId(id);

            if (!medicoExistente || medicoExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Médico con ID: ${id} no encontrado`
                });
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

            res.status(200).json({
                estado: "OK",
                mensaje: "Médico actualizado exitosamente",
                data: medicoEditado
            });

        } catch (error) {
            console.error("ERROR al editar médico:", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar médico"
            });
        }
    }

    eliminarMedico = async (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {
            const { id } = req.params;

            const result = await this.medicos.eliminarMedico(id);

            if (!result) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Médico con ID: ${id} no encontrado`
                });
            }

            res.status(200).json({
                estado: "OK",
                mensaje: "Médico eliminado exitosamente"
            });

        } catch (error) {
            console.error("ERROR al eliminar médico:", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar médico"
            });
        }
    }
}