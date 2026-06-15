import conexion from "../config/database.js";

export default class UsuariosModel {

    listarUsuarios = async () => {
        const query = `
            SELECT
                id_usuario,
                documento,
                apellido,
                nombres,
                email,
                foto_path,
                rol
            FROM usuarios
            WHERE activo = 1
        `;

        const [rows] = await conexion.execute(query);
        return rows;
    }

    obtenerPorId = async (id) => {

        const query = `
            SELECT
                id_usuario,
                documento,
                apellido,
                nombres,
                email,
                foto_path,
                rol
            FROM usuarios
            WHERE id_usuario = ?
            AND activo = 1
        `;

        const [rows] = await conexion.execute(query, [id]);
        return rows;
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

        const query = `
            INSERT INTO usuarios
            (
                documento,
                apellido,
                nombres,
                email,
                contrasenia,
                foto_path,
                rol
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await conexion.execute(query, [
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol
        ]);

        return result.insertId;
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

        const query = `
            UPDATE usuarios
            SET
                documento = ?,
                apellido = ?,
                nombres = ?,
                email = ?,
                contrasenia = ?,
                foto_path = ?,
                rol = ?
            WHERE id_usuario = ?
        `;

        const [result] = await conexion.execute(query, [
            documento,
            apellido,
            nombres,
            email,
            contrasenia,
            foto_path,
            rol,
            id
        ]);

        return id;
    }

    eliminarUsuario = async (id) => {

        const query = `
            UPDATE usuarios
            SET activo = 0
            WHERE id_usuario = ?
        `;

        const [result] = await conexion.execute(query, [id]);

        return result;
    }
    
    buscar = async (
        email,
        contrasenia
    ) => {

        const query = `
            SELECT
                id_usuario,
                documento,
                apellido,
                nombres,
                email,
                foto_path,
                rol
            FROM usuarios
            WHERE email = ?
            AND contrasenia = ?
            AND activo = 1
        `;

        const [rows] = await conexion.execute(
            query,
            [
                email,
                contrasenia
            ]
        );

        return rows[0];
    }

    buscarPorId = async (
        id_usuario
    ) => {

        const query = `
            SELECT
                id_usuario,
                documento,
                apellido,
                nombres,
                email,
                foto_path,
                rol
            FROM usuarios
            WHERE id_usuario = ?
            AND activo = 1
        `;

        const [rows] = await conexion.execute(
            query,
            [id_usuario]
        );

        return rows[0];
    }
}