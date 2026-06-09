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
        

  obtenerPorId = (id) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }

            return this.obrasSociales. obtenerPorId (id);

        } catch (error) {

            console.error("ERROR: error en obrasSocialesModel al obtener obrasSociales por ID",error);
            throw new Error("Error al obtener la obraSociales por ID");
        }
    }

     crearObraSocial= (nombre) => {
        try {
            return this.obrasSociales.crearObraSocial (nombre);
        } catch (error) {
            console.error("ERROR: error en obrasSocialesModel  al crear obrasSociales",error);
            throw new Error("Error al crear la obrasSociales");
        }
    }

    editarObraSociales = (id, nombre) => {
        try {
            if (!id || isNaN(parseInt(id))) {
                throw new Error('ID inválido proporcionado');
            }
            return this.obrasSociales.editarObraSociales(id, nombre);
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


} }