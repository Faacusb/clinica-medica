import obrasSocialesModel from "../database/obrasSocialesModel.js";

export default class obrasSocialesService {

    constructor(){
        this.obrasSociales = new obrasSocialesModel();
    }

   listarObrasSociales= () => {
        try {
            return this.obrasSociales.listarObrasSociales();

        } catch (error) {

            console.error("ERROR: error en obrasSocialesModell listar obrasSociales",error);
            throw new Error("Error al obtener la lista de obrasSociales");
        }
    }

  obtenerPorId = (id) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            const datos = this.obrasSociales.obtenerPorId(id);
            return datos;

        } catch (error) {

            console.error("ERROR: error en obrasSocialesModel al obtener obrasSociales por ID",error);
            throw new Error("Error al obtener la obraSociales por ID");
        }
    }

     crearObraSocial= async(nombre,descripcion,porcentaje_descuento,es_particular) => {
        try {
            const nuevo_id = await this.obrasSociales.crearObraSocial(nombre, descripcion, porcentaje_descuento, es_particular);
            return this.obrasSociales.obtenerPorId(nuevo_id);
        } catch (error) {
            console.error("ERROR: error en obrasSocialesModel  al crear obrasSociales",error);
            throw new Error("Error al crear la obrasSociales");
        }
    }

    editarObraSociales = ( nombre, descripcion, porcentaje_descuento, es_particular) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            return this.obrasSociales.editarObraSociales( nombre, descripcion, porcentaje_descuento, es_particular);
        } catch (error) {
            console.error("ERROR: error en  obrasSocialesModel al editar obrasSociales",error);
            throw new Error("Error al editar la obrasSociales");
        }
    }

    eliminarObrasSociales= (id) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            return this.obrasSociales.eliminarObrasSociales(id);
        } catch (error) {
            console.error("ERROR: error en obrasSocialesModel al eliminar especialidad",error);
            throw new Error("Error al eliminar la obrasSociales");
        }
    }


} 