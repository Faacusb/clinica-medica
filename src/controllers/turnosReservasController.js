import TurnosReservasService from "../services/turnosReservasService.js";
import { validationResult } from "express-validator";
import PDFDocument from "pdfkit";
import JSendResponse from "../utils/JSendResponse.js";

export default class TurnosReservasController {

    constructor() {
        this.turnos = new TurnosReservasService();
    }

    listarTurnos = async (req, res) => {
        try {

            const turnos = await this.turnos.listarTurnos();

            res.status(200).json(JSendResponse.success(turnos));
        } catch (error) {

            console.error("ERROR: error al listar turnos", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener la lista de turnos"));
        }
    }

    generarInformePDF = async (req, res) => {

        try {

            const turnos = await this.turnos.listarTurnos();

            const doc = new PDFDocument();

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=informe-turnos.pdf"
            );

            doc.pipe(res);

            doc.fontSize(20).text("INFORME DE TURNOS", {
                align: "center"
            });

            doc.moveDown();

            doc.fontSize(12).text(`Cantidad total de turnos: ${turnos.length}`);

            doc.moveDown();

            turnos.forEach((turno) => {

                doc.text(`Turno #${turno.id_turno_reserva}`);
                doc.text(`Paciente ID: ${turno.id_paciente}`);
                doc.text(`Obra Social ID: ${turno.id_obra_social}`);
                doc.text(`Fecha: ${turno.fecha_hora}`);
                doc.text(`Valor Total: $${turno.valor_total}`);
                doc.text(`Atendido: ${turno.atentido ? "SI" : "NO"}`);

                doc.moveDown();
            });

            doc.end();

        } catch (error) {
            console.error("ERROR: error al generar informe PDF", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al generar informe PDF"));
        }
    }   

    obtenerPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const turno = await this.turnos.obtenerPorId(id);

            if (!turno || turno.length === 0) {
                return res.status(404).json(JSendResponse.error(`Turno con ID ${id} no encontrado`));
            }

            res.status(200).json(JSendResponse.success(turno));
        } catch (error) {
            console.error("ERROR: error al obtener turno por ID", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener turno por ID"));
        }
    }

    buscarTurnosUsuario = async (req, res) => {
        try {
            const turnos = await this.turnos.buscarTurnosUsuario(req.user);
            res.status(200).json(JSendResponse.success(turnos));
        } catch (error) {
            console.error("ERROR: error al buscar turnos del usuario", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al buscar turnos del usuario"));
        }
    }

    crearTurno = async (req, res) => {
        try {
            const {
                id_medico,
                id_paciente,
                fecha_hora
            } = req.body;

            const turno = {
                id_medico,
                id_paciente,
                fecha_hora
            };

            const nuevoTurno = await this.turnos.crearTurno(turno);

            res.status(201).json(JSendResponse.success(nuevoTurno));
        } catch (error) {
            console.error("ERROR: error al crear turno", error);
            res.status(500).json(JSendResponse.error(error.message || "Error interno del servidor al crear turno"));
        }
    }

    marcarTurnoAtendido = async (req, res) => {
        try {
            const { id } = req.params;
            const { atendido } = req.body;

            const turnoExistente = await this.turnos.obtenerPorId(id);

            if (!turnoExistente || turnoExistente.length === 0) {
                return res.status(404).json(JSendResponse.error(`Turno con ID ${id} no encontrado`));
            }

            const turnoActualizado = await this.turnos.marcarTurnoAtendido(id, atendido);

            res.status(200).json(JSendResponse.success(turnoActualizado));
        } catch (error) {
            console.error("ERROR: error al marcar turno como atendido", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al marcar el turno como atendido"));
        }
    }

    editarTurno = async (req, res) => {
        try {
            const { id } = req.params;

            const {
                id_medico,
                id_paciente,
                fecha_hora
            } = req.body;

            const turno = {
                id_medico,
                id_paciente,
                fecha_hora
            };

            const turnoExistente = await this.turnos.obtenerPorId(id);

            if (!turnoExistente || turnoExistente.length === 0) {
                return res.status(404).json(JSendResponse.error(`Turno con ID ${id} no encontrado`));
            }

            const turnoEditado = await this.turnos.editarTurno(id, turno);

            res.status(200).json(JSendResponse.success(turnoEditado));
        } catch (error) {
            console.error("ERROR: error al editar turno", error);
            res.status(500).json(JSendResponse.error(error.message || "Error interno del servidor al editar turno"));
        }
    }

    eliminarTurno = async (req, res) => {
        try {
            const { id } = req.params;
            const turnoEliminado = await this.turnos.eliminarTurno(id);

            res.status(200).json(JSendResponse.success(`Turno con ID: ${id} eliminado exitosamente`));
        } catch (error) {
            console.error("ERROR: error al eliminar turno", error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al eliminar turno"));
        }
    }
}
           
    

