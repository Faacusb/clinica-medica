import conexion from "../config/database.js";

export default class ObrasSocialesModel {

    listarObras_sociales = async () => {
        const query =
            "SELECT id_obra_social, nombre, descripcion, porcentaje_descuento, es_particular FROM obras_sociales WHERE activo = 1";

        const [rows] = await conexion.execute(query);

        return rows;
    }

    obtenerPorId = async (id) => {
        const query =
            "SELECT * FROM obras_sociales WHERE id_obra_social = ? AND activo = 1";

        const [rows] = await conexion.execute(query, [id]);

        return rows;
    }

    crearObra_social = async (
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular,
        activo = 1
    ) => {

        const [rows] = await conexion.execute(
            "SELECT MAX(id_obra_social) AS maxId FROM obras_sociales"
        );

        const nuevoId = (rows[0].maxId || 0) + 1;

        const query = `
        INSERT INTO obras_sociales
        (
            id_obra_social,
            nombre,
            descripcion,
            porcentaje_descuento,
            es_particular,
            activo
         )
        VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await conexion.execute(
            query,
            [
                nuevoId,
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo
            ]
        );

        return result;
    }

    editarObra_social = async (
        id,
        nombre,
        descripcion,
        porcentaje_descuento,
        es_particular,
        activo
    ) => {

        const query = `
        UPDATE obras_sociales
        SET
            nombre = ?,
            descripcion = ?,
            porcentaje_descuento = ?,
            es_particular = ?,
            activo = ?
        WHERE id_obra_social = ?
        `;

        const [result] = await conexion.execute(
            query,
            [
                nombre,
                descripcion,
                porcentaje_descuento,
                es_particular,
                activo,
                id
            ]
        );

        return result;
    }

    eliminarObra_social = async (id) => {

        const query =
            "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?";

        const [result] = await conexion.execute(query, [id]);

        return result;
    }
}