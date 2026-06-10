import ObrasSocialesService from "../services/obrasSocialesService.js";
import { validationResult } from "express-validator";

export default class ObrasSocialesController {

    constructor() {
        this.obrasSociales  = new ObrasSocialesService();
    }

    listarObrasSociales = async (req, res) => {
        try {
            const data = await this.obrasSociales.listarObrasSociales();

            res.status(200).json({
                estado: "OK",
                data: data
            });

        } catch (error) {
           console.log(error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener obras sociales"
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

            const data = await this.obrasSociales.obtenerPorId(id);

            res.status(200).json({
                estado: "OK",
                data: data
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener obra social"
            });
        }
    }

     crearObraSocial = async (req, res) => {
        try {
            const {nombre,descripcion,porcentaje_descuento,es_particular} = req.body;

            const nuevaObraSocial = await this.obrasSociales.crearObraSocial(nombre, descripcion, porcentaje_descuento, es_particular);

            res.status(201).json({
                estado: "OK",
                data: nuevaObraSocial
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                estado: "ERROR"
            });
        }
    }

     editarObraSociales = async (req, res) => {
        try {
            const data = await this.obrasSociales.editarObraSociales(
                req.params.id,
                req.body
            );

            res.status(200).json({
                estado: "OK",
                data
            });

        } catch (error) {
            res.status(500).json({
                estado: "ERROR"
            });
        }
    }

    eliminarObrasSociales= async (req, res) => {
        try {
            const data = await this.obrasSociales.eliminarObrasSociales (req.params.id);

            res.status(200).json({
                estado: "OK",
                data
            });

        } catch (error) {
            res.status(500).json({
                estado: "ERROR"
            });
        }
    }
}


