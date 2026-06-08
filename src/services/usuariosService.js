import UsuariosModel from "../database/usuariosModel.js";

export default class UsuariosService {

    constructor() {
        this.usuarios = new UsuariosModel();
    }

    listarUsuarios = () => {
        return this.usuarios.listarUsuarios();
    }

    obtenerPorId = (id) => {
        return this.usuarios.obtenerPorId(id);
    }

    crearUsuario = (
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path,
        rol
    ) => {

        if (![1, 2, 3].includes(Number(rol))) {
            throw new Error("Rol inválido");
        }

        return this.usuarios.crearUsuario(
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        );
    }

    editarUsuario = (
        id,
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path,
        rol
    ) => {

        return this.usuarios.editarUsuario(
            id,
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        );
    }

    eliminarUsuario = (id) => {
        return this.usuarios.eliminarUsuario(id);
    }
}