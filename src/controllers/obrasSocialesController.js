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
            console.error("ERROR listar obras sociales", error);

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

            if (!data || data.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: "Obra social no encontrada"
                });
            }

            res.status(200).json({
                estado: "OK",
                data: data[0]
            });

        } catch (error) {
            console.error("ERROR obtener obra social", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener obra social"
            });
        }
    }

    crear = async (req, res) => {
        try {
            const {
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo
            } = req.body;

            const data = await this.service.crear(
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo
            );

            res.status(201).json({
                estado: "OK",
                mensaje: "Obra social creada correctamente",
                data
            });

        } catch (error) {
            console.error("ERROR crear obra social", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear obra social"
            });
        }
    }

    editar = async (req, res) => {
        try {
            const { id } = req.params;

            const {
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo
            } = req.body;

            const data = await this.service.editar(
                id,
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo
            );

            if (data.affectedRows === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: "Obra social no encontrada"
                });
            }

            res.status(200).json({
                estado: "OK",
                mensaje: "Obra social actualizada correctamente",
                data
            });

        } catch (error) {
            console.error("ERROR editar obra social", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar obra social"
            });
        }
    }

    eliminar = async (req, res) => {
        try {
            const { id } = req.params;

            const data = await this.service.eliminar(id);

            if (data.affectedRows === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: "Obra social no encontrada"
                });
            }

            res.status(200).json({
                estado: "OK",
                mensaje: "Obra social eliminada correctamente"
            });

        } catch (error) {
            console.error("ERROR eliminar obra social", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar obra social"
            });
        }
    }
}