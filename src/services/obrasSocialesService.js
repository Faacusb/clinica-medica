import obrasSocialesModel from "../database/obrasSocialesModel.js";

export default class ObrasSocialesService {



    listar = async () => {
        const [rows] = await conexion.execute(
            "SELECT * FROM obras_sociales"
        );
        return rows;
    }

    obtenerPorId = async (id) => {
        const [rows] = await conexion.execute(
            "SELECT * FROM obras_sociales WHERE id = ?",
            [id]
        );
        return rows;
    }

    crear = async (nombre, descripcion, descuento, es_particular, activo) => {
        const [result] = await conexion.execute(
            `INSERT INTO obras_sociales
            (nombre, descripcion, porcentaje_descuento, es_particular, activo)
            VALUES (?, ?, ?, ?, ?)`,
            [nombre, descripcion, descuento, es_particular, activo]
        );
        return result;
    }

    editar = async (id, nombre, descripcion, descuento, es_particular, activo) => {
        const [result] = await conexion.execute(
            `UPDATE obras_sociales
            SET nombre=?, descripcion=?, porcentaje_descuento=?, es_particular=?, activo=?
            WHERE id=?`,
            [nombre, descripcion, descuento, es_particular, activo, id]
        );
        return result;
    }

    eliminar = async (id) => {
        const [result] = await conexion.execute(
            "DELETE FROM obras_sociales WHERE id=?",
            [id]
        );
        return result;
    }
}

