import ObrasSocialesModel from "../database/obrasSocialesModel.js";
import apicache from "apicache";

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

    crearObraSocial = async (
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    ) => {

        const nuevoId = await this.obrasSociales.crearObraSocial(
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        );
        
        apicache.clear();        
        
        return this.obrasSociales.obtenerPorId(nuevoId);
    }

    editarObraSociales = async (
        id,
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular
    ) => {
        const modificado = await this.obrasSociales.editarObraSociales(
            id,
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular
        );

        apicache.clear();
        return this.obrasSociales.obtenerPorId(modificado);
    }

    eliminarObrasSociales = async (id) => {
        const eliminado = await this.obrasSociales.eliminarObrasSociales(id);
        apicache.clear();
        return eliminado;
    }

}