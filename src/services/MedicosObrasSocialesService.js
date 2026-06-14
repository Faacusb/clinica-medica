import MedicosObrasSocialesModel from "../database/MedicosObrasSocialesModel.js";

export default class MedicosObrasSocialesService{

    constructor() {
        this.MedicosObrasSociales = new MedicosObrasSocialesModel();
    }

    listarMedicosObrasSociales = () => {
        return this.MedicosObrasSociales.listarMedicosObrasSociales ();
    }

    obtenerPorId = (id) => {
        return this.MedicosObrasSociales.obtenerPorId(id);
    }

     crearMedicoObrasSocial = (
        id_medico,
         id_obra_social,
    ) => {

        return this.MedicosObrasSociales. crearMedicoObrasSocial(
            id_medico,
            id_obra_social,
        );
    }

    editarMedicoObraSocial = (
        id,
        id_medico,
        id_obra_social,
    ) => {

        return this.MedicosObrasSociales.editarMedicoObraSocial(
            id,
            id_medico,
             id_obra_social
        );
    }

    eliminarMedicoObraSocial = (id) => {
        return this.MedicosObrasSociales.eliminarMedicoObraSocial(id);
    }
}