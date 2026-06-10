import ObrasSocialesModel from "../database/obrasSocialesModel.js";

export default class ObrasSocialesService {

    constructor() {
        this.obrasSociales = new ObrasSocialesModel();
    }

    listarObrasSociales = () => {
        return this.obrasSociales.listarObrasSociales();
    }

    obtenerPorId = (id) => {
        return this.obrasSociales.obtenerPorId(id);
    }

    crearObraSocial = (
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    ) => {

        return this.obrasSociales.crearObraSocial(
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        );
    }

    editarObraSociales = (
        id,
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular,
        activo
    ) => {

        return this.obrasSociales.editarObraSociales(
            id,
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            activo
        );
    }

    eliminarObrasSociales = (id) => {
        return this.obrasSociales.eliminarObrasSociales(id);
    }

}