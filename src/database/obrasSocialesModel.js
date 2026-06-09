import conexion from "../database/conexion.js";

export default class ObrasSocialesModel {

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

    crear = async (data) => {
        const [result] = await conexion.execute(
            `INSERT INTO obras_sociales
            (nombre, descripcion, porcentaje_descuento, es_particular, activo)
            VALUES (?, ?, ?, ?, ?)`,
            [
                data.nombre,
                data.descripcion,
                data.porcentaje_descuento,
                data.es_particular,
                data.activo
            ]
        );
        return result;
    }

    editar = async (id, data) => {
        const [result] = await conexion.execute(
            `UPDATE obras_sociales
            SET nombre=?, descripcion=?, porcentaje_descuento=?, es_particular=?, activo=?
            WHERE id=?`,
            [
                data.nombre,
                data.descripcion,
                data.porcentaje_descuento,
                data.es_particular,
                data.activo,
                id
            ]
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