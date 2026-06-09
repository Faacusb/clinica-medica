import ObrasSocialesService from "../services/obrasSocialesService.js";

export default class ObrasSocialesController {

    constructor() {
        this.obrasSociales  = new ObrasSocialesService();
    }

    listarObrasSociales = async (req, res) => {
        try {
            const data = await this.obrasSociales.listarObrasSociales();

            res.status(200).json({
                estado: "OK",
                data
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
        try {
            const { id } = req.params;

            const data = await this.service.obtenerPorId(id);

            res.status(200).json({
                estado: "OK",
                data
            });

        } catch (error) {
            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener obra social"
            });
        }
    }

     crearObraSocial = async (req, res) => {
        try {
            const data = await this.service. crearObraSocial(req.body);

            res.status(201).json({
                estado: "OK",
                data
            });

        } catch (error) {
            res.status(500).json({
                estado: "ERROR"
            });
        }
    }

     editarObraSociales = async (req, res) => {
        try {
            const data = await this.service. editarObraSociales(
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
            const data = await this.service.eliminarObrasSociales (req.params.id);

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


