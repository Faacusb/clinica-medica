import MedicosObrasSocialesService from "../services/MedicosObrasSocialesService.js";
import { validationResult } from "express-validator";

export default class MedicosObrasSocialesController {

constructor() {
    this.MedicosObrasSociales =
        new MedicosObrasSocialesService();
}
listarMedicosObrasSociales = async (req, res) => {

    try {
       const data =
            await this.MedicosObrasSociales
                .listarMedicosObrasSociales();

        res.status(200).json({
            estado: "OK",
            data
        });

    } catch (error) {

        console.error(
            "ERROR al listar médicos con obras sociales:",
            error
        );
        res.status(500).json({
            estado: "ERROR",
            mensaje:
       "Error al obtener la lista de médicos con obras sociales"
        });
    }
};

obtenerPorId = async (req, res) => {

    const errores =
        validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            estado: "ERROR",
            errores: errores.array()
        });

    }
    try {

        const { id } =
            req.params;

        const data =
            await this.MedicosObrasSociales
                .obtenerPorId(id);

        if (!data || data.length === 0) {

            return res.status(404).json({
                estado: "ERROR",
                mensaje:
                    `Médico con obra social con ID: ${id} no encontrado`
            });

        }
        res.status(200).json({
            estado: "OK",
            data: data[0]
        });

    } catch (error) {

        console.error(
            "ERROR al obtener médico con obra social:",
            error
        );
        res.status(500).json({
            estado: "ERROR",
            mensaje:
                "Error al obtener médico con obra social"
        });
    }
};

crearMedicoObraSocial = async (req, res) => {

    try {
        const {
            id_medico,
            id_obra_social
        } = req.body;

        const data =
            await this.MedicosObrasSociales
                .crearMedicoObraSocial(
                    id_medico,
                    id_obra_social
                );
        res.status(201).json({
            estado: "OK",
            mensaje:
                "Médico con obra social creado exitosamente",
            data
        });
    } catch (error) {

        console.error(
            "ERROR al crear médico con obra social:",
            error
        );
        res.status(500).json({
            estado: "ERROR",
            mensaje:
                "Error al crear médico con obra social"
        });
    }
};
editarMedicoObraSocial = async (req, res) => {
    const errores =
        validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            estado: "ERROR",
            errores: errores.array()
        });
    }
    try {
        const { id } =
            req.params;
        const {
            id_medico,
            id_obra_social,
        } = req.body;

        const data =
            await this.MedicosObrasSociales
                .editarMedicoObraSocial(
                    id,
                    id_medico,
                    id_obra_social,
                );
        res.status(200).json({
            estado: "OK",
            mensaje:
                "Médico con obra social actualizado exitosamente",
        });

    } catch (error) {

        console.error(
            "ERROR al editar médico con obra social:",
            error
        );
        res.status(500).json({
            estado: "ERROR",
            mensaje:
                "Error al editar médico con obra social"
        });
    }
};
eliminarMedicoObraSocial = async (req, res) => {
    const errores =
        validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({
            estado: "ERROR",
            errores: errores.array()
        });
    }
    try {
        const { id } =
            req.params;
        const result =
            await this.MedicosObrasSociales
                .eliminarMedicoObraSocial(id);
        if (!result) {

            return res.status(404).json({
                estado: "ERROR",
                mensaje:
                    `Médico con obra social con ID: ${id} no encontrado`
            });
        }

        res.status(200).json({
            estado: "OK",
            mensaje:
                "Médico con obra social eliminado exitosamente"
        });

    } catch (error) {

        console.error(
            "ERROR al eliminar médico con obra social:",
            error
        );
        res.status(500).json({
            estado: "ERROR",
            mensaje:
                "Error al eliminar médico con obra social"
        });
    }
};
}
