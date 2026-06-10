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

    crearEspecialidad = async ( nombre) => {
        const query = "INSERT INTO especialidades (nombre) VALUES (?)";
        const [result] = await conexion.execute(query, [nombre]);

        if (result.affectedRows === 0){
            return null;
        }

        return result.insertId;
    }

    editarEspecialidad = async (id, nombre,) => {
        const query = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';
        const [result] = await conexion.execute(query, [nombre, id]);
        return id;
    }

    eliminarEspecialidad = async (id) => {
        const query = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';
        const [result] = await conexion.execute(query, [id]);
        return result;
    }


}