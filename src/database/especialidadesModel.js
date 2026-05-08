import conexion from "../config/database.js";

export default class EspecialidadesModel {

    listarEspecialidades = async () => {
        const query = 'SELECT id_especialidad, nombre FROM especialidades WHERE activo = 1';
        const [rows] = await conexion.execute(query);
        return rows;
    }

    obtenerPorId = async (id) => {
        const query = 'SELECT * FROM especialidades WHERE id_especialidad = ? AND activo = 1';
        const [rows] = await conexion.execute(query, [id]);
        return rows;
    }

    crearEspecialidad = async ( nombre, activo=1) => {
        // Buscar el último ID
        const [rows] = await conexion.execute("SELECT MAX(id_especialidad) AS maxId FROM especialidades");
        const nuevoId = (rows[0].maxId || 0) + 1;

        // Insertar con el nuevo ID
        const query = "INSERT INTO especialidades (id_especialidad, nombre, activo) VALUES (?, ?, ?)";
        const [result] = await conexion.execute(query, [nuevoId, nombre, activo]);
        return result;
    }

    editarEspecialidad = async (id, nombre,) => {
        const query = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
        const [result] = await conexion.execute(query, [nombre, id]);
        return result;
    }

    eliminarEspecialidad = async (id) => {
        const query = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
        const [result] = await conexion.execute(query, [id]);
        return result;
    }


}