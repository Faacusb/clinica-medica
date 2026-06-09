import ObrasSocialesService from "../services/obrasSocialesService.js";

export default class ObrasSocialesController {

    constructor() {
        this.service = new ObrasSocialesService();
    }

    listar = async (req, res) => {
        try {
            const data = await this.service.listar();

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

    crear = async (req, res) => {
        try {
            const data = await this.service.crear(req.body);

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

    editar = async (req, res) => {
        try {
            const data = await this.service.editar(
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

    eliminar = async (req, res) => {
        try {
            const data = await this.service.eliminar(req.params.id);

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


