import ObrasSocialesService from "../services/obrasSocialesService.js";
import { validationResult } from "express-validator";
import JSendResponse from "../utils/JSendResponse.js";

export default class ObrasSocialesController {

    constructor() {
        this.obrasSociales  = new ObrasSocialesService();
    }

    listarObrasSociales = async (req, res) => {
        try {
            const data = await this.obrasSociales.listarObrasSociales();
            res.status(200).json(JSendResponse.success(data));

        } catch (error) {
            console.log(error);
            console.error("ERROR: error al listar Obras Sociales",error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener la lista de Obras Sociales"));
        }
    }

    obtenerPorId = async (req, res) => {
        try {

            const { id } = req.params;
            const data = await this.obrasSociales.obtenerPorId(id);

            if (!data || data.length === 0) {
                return res.status(404).json(JSendResponse.error(`Obra social con ID: ${id} no encontrada`));
            }

            res.status(200).json(JSendResponse.success(data));

        } catch (error) {
            console.log(error);
            console.error("ERROR: error al obtener obra social",error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al obtener la especialidad por ID"));
        }
    }
           

    crearObraSocial = async (req, res) => {
        try {
            const {nombre,descripcion,porcentaje_descuento,es_particular} = req.body;

            const nuevaObraSocial = await this.obrasSociales.crearObraSocial(nombre, descripcion, porcentaje_descuento, es_particular);

            res.status(201).json(JSendResponse.success(nuevaObraSocial));

        } catch (error) {
            console.log(error);
            res.status(500).json(JSendResponse.error("Error interno del servidor al crear la obra social"));
        }
    }

    editarObraSociales = async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const obraExistente =
                await this.obrasSociales.obtenerPorId(id);

            if (!obraExistente || obraExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Obra social con ID: ${id} no encontrada`
                });
            }

            const {
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular
            } = req.body;

            const data =
                await this.obrasSociales.editarObraSociales(
                    id,
                    nombre,
                    descripcion,
                    porcentaje_descuento,
                    es_particular
                );

            res.status(200).json({
                estado: "OK",
                mensaje: "Obra social actualizada exitosamente",
                data
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar obra social"
            });
        }
    }

    eliminarObrasSociales = async (req, res) => {

        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const obraExistente =
                await this.obrasSociales.obtenerPorId(id);

            if (!obraExistente || obraExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Obra social con ID: ${id} no encontrada`
                });
            }

            await this.obrasSociales.eliminarObrasSociales(id);

            res.status(200).json({
                estado: "OK",
                mensaje: "Obra social eliminada exitosamente"
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar obra social"
            });
        }
    }
}