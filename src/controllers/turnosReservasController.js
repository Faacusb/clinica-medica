import TurnosReservasService from "../services/turnosReservasService.js";
import { validationResult } from "express-validator";
import PDFDocument from "pdfkit";

export default class TurnosReservasController {

    constructor() {
        this.turnos = new TurnosReservasService();
    }

    listarTurnos = async (req, res) => {
        try {

            const turnos = await this.turnos.listarTurnos();

            res.status(200).json({
                estado: "OK",
                data: turnos
            });

        } catch (error) {

            console.error("ERROR: error al listar turnos", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener los turnos"
            });
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

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al generar informe PDF"
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

            const turno = await this.turnos.obtenerPorId(id);

            if (!turno || turno.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Turno con ID ${id} no encontrado`
                });
            }

            res.status(200).json({
                estado: "OK",
                data: turno
            });

        } catch (error) {

            console.error("ERROR: error al obtener turno", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener turno"
            });
        }
    }

    crearTurno = async (req, res) => {

        try {

            const {
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            } = req.body;

            const nuevoTurno = await this.turnos.crearTurno(
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            );

            res.status(201).json({
                estado: "OK",
                mensaje: "Turno creado exitosamente",
                data: nuevoTurno
            });

        } catch (error) {

            console.error("ERROR: error al crear turno", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear turno"
            });
        }
    }

    editarTurno = async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const turnoExistente = await this.turnos.obtenerPorId(id);

            if (!turnoExistente || turnoExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Turno con ID ${id} no encontrado`
                });
            }

            const {
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            } = req.body;

            const turnoEditado = await this.turnos.editarTurno(
                id,
                id_medico,
                id_paciente,
                id_obra_social,
                fecha_hora,
                valor_total,
                atentido,
                activo
            );

            res.status(200).json({
                estado: "OK",
                mensaje: "Turno actualizado exitosamente",
                data: turnoEditado
            });

        } catch (error) {

            console.error("ERROR: error al editar turno", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar turno"
            });
        }
    }

    eliminarTurno = async (req, res) => {

        try {

            const { id } = req.params;

            const turnoEliminado = await this.turnos.eliminarTurno(id);

            res.status(200).json({
                estado: "OK",
                mensaje: "Turno eliminado correctamente",
                data: turnoEliminado
            });

        } catch (error) {

            console.error("ERROR: error al eliminar turno", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar turno"
            });
        }
    }
}
