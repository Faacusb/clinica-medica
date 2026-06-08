import UsuariosService from "../services/usuariosService.js";
import { validationResult } from "express-validator";

export default class UsuariosController {

    constructor() {
        this.usuarios = new UsuariosService();
    }

    listarUsuarios = async (req, res) => {
        try {

            const usuarios = await this.usuarios.listarUsuarios();

            res.status(200).json({
                estado: "OK",
                data: usuarios
            });

        } catch (error) {

            console.error("ERROR: error al listar usuarios", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener la lista de usuarios"
            });
        }
    }

    obtenerPorId = async (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const usuario = await this.usuarios.obtenerPorId(id);

            if (!usuario || usuario.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Usuario con ID: ${id} no encontrado`
                });
            }

            res.status(200).json({
                estado: "OK",
                data: usuario
            });

        } catch (error) {

            console.error("ERROR: error al obtener usuario por ID", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al obtener el usuario por ID"
            });
        }
    }

    crearUsuario = async (req, res) => {
        try {

            const {
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            } = req.body;

            const nuevoUsuario = await this.usuarios.crearUsuario(
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            );

            res.status(201).json({
                estado: "OK",
                mensaje: "Usuario creado exitosamente",
                data: nuevoUsuario
            });

        } catch (error) {

            console.error("ERROR: error al crear usuario", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al crear el usuario"
            });
        }
    }

    editarUsuario = async (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const usuarioExistente = await this.usuarios.obtenerPorId(id);

            if (!usuarioExistente || usuarioExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Usuario con ID: ${id} no encontrado`
                });
            }

            const {
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            } = req.body;

            const usuarioEditado = await this.usuarios.editarUsuario(
                id,
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            );

            res.status(200).json({
                estado: "OK",
                mensaje: "Usuario actualizado exitosamente",
                data: usuarioEditado
            });

        } catch (error) {

            console.error("ERROR: error al editar usuario", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al editar el usuario"
            });
        }
    }

    eliminarUsuario = async (req, res) => {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({
                estado: "ERROR",
                errores: errores.array()
            });
        }

        try {

            const { id } = req.params;

            const usuarioExistente = await this.usuarios.obtenerPorId(id);

            if (!usuarioExistente || usuarioExistente.length === 0) {
                return res.status(404).json({
                    estado: "ERROR",
                    mensaje: `Usuario con ID: ${id} no encontrado`
                });
            }

            await this.usuarios.eliminarUsuario(id);

            res.status(200).json({
                estado: "OK",
                mensaje: "Usuario eliminado exitosamente"
            });

        } catch (error) {

            console.error("ERROR: error al eliminar usuario", error);

            res.status(500).json({
                estado: "ERROR",
                mensaje: "Error al eliminar el usuario"
            });
        }
    }

}