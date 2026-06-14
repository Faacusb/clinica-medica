import UsuariosModel from "../database/usuariosModel.js";
import apicache from "apicache";

export default class UsuariosService {

    constructor() {
        this.usuarios = new UsuariosModel();
    }

    listarUsuarios = () => {
        try {
            return this.usuarios.listarUsuarios();
        } catch (error) {
            console.error("ERROR: error en usuariosService al listar usuarios", error);
            throw new Error("Error al obtener la lista de usuarios");
        }
        
    }

    obtenerPorId = (id) => {
        try {
            return this.usuarios.obtenerPorId(id);
        } catch (error) {
            console.error("ERROR: error en usuariosService al obtener usuario por ID", error);
            throw new Error("Error al obtener el usuario por ID");
        }
        
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

        try {
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

            return this.usuarios.obtenerPorId(nuevo_id);
        } catch (error) {
            console.error("ERROR: error en usuariosService al crear usuario", error);
            throw new Error("Error al crear el usuario");
        }

        
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
        try {
            const existe = await this.usuarios.obtenerPorId(id);
            if (!existe || existe.length === 0) {
                throw new Error(`No se encontró un usuario con ID: ${id}`);
            }

            const modificado = await this.usuarios.editarUsuario(
                id,
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            );
            
            return await this.usuarios.obtenerPorId(id);
        } catch (error) {
            console.error("ERROR: error en usuariosService al editar usuario", error);
            throw new Error("Error al editar el usuario");
        }
        
    }

    eliminarUsuario = async(id) => {
        try {
            return await this.usuarios.eliminarUsuario(id);
        } catch (error) {
            console.error("ERROR: error en usuariosService al eliminar usuario", error);
            throw new Error("Error al eliminar el usuario");
        }   
    }
}