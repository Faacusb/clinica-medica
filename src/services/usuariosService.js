import UsuariosModel from "../database/usuariosModel.js";
import apicache from "apicache";

export default class UsuariosService {

    constructor() {
        this.usuarios = new UsuariosModel();
    }

    listarUsuarios = async () => {
        return await this.usuarios.listarUsuarios();
    }

    obtenerPorId = async (id) => {
        return await this.usuarios.obtenerPorId(id);
    }

    crearUsuario = async (
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

        const nuevo_id = await this.usuarios.crearUsuario(
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        );

        apicache.clear();

        return await this.usuarios.obtenerPorId(nuevo_id);
    }

    editarUsuario = async (
        id,
        documento,
        apellido,
        nombres,
        email,
        contrasenia,
        foto_path,
        rol
    ) => {

        const existe = await this.usuarios.obtenerPorId(id);

        if (!existe || existe.length === 0) {
            throw new Error(`No se encontró un usuario con ID: ${id}`);
        }

        await this.usuarios.editarUsuario(
            id,
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        );

        apicache.clear();

        return await this.usuarios.obtenerPorId(id);
    }

    eliminarUsuario = async (id) => {

        const eliminado = await this.usuarios.eliminarUsuario(id);

        apicache.clear();

        return eliminado;
    }

    buscar = async (
        email,
        contrasenia
    ) => {

        return await this.usuarios.buscar(
            email,
            contrasenia
        );
    }

    buscarPorId = async (
        id_usuario
    ) => {

        return await this.usuarios.buscarPorId(
            id_usuario
        );
    }
}