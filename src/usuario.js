import express from "express";
import conexion from "./config/database.js";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(morgan('dev'));

//Listar todos los usuarios activos
app.get('/usuarios', async (req, res) => {
    try {
        const query = 'SELECT id_usuario, nombres, apellido, documento, email, rol FROM usuarios WHERE activo = 1';
        const [rows] = await conexion.execute(query);
        res.send({
            estado: "OK",
            data: rows
        })
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            mensaje: "Error al obtener los usuarios"
        });
    }
})

//Obtener detalle de un usuario en específico por ID
app.get('/usuarios/:id', async (req, res) => { 
    const { id } = req.params;
    try {
        const query = 'SELECT id_usuario, nombres, apellido, documento, email, contrasenia, foto_path, rol FROM usuarios WHERE id_usuario = ? AND activo = 1';
        const [rows] = await conexion.execute(query, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ estado: "ERROR", msg: "Usuario no encontrado" });
        }

        res.send({
            estado: "OK",
            data: rows
        })

    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            mensaje: "Error al obtener el usuario"
        });
    }
})

//Crear un nuevo usuario
app.post('/usuarios', async (req, res) =>{
    const {  id_usuario, documento,apellido, nombres,  email, contrasenia, foto_path, rol, activo } = req.body;
    try {
        const [rows] = await conexion.execute('INSERT INTO usuarios (id_usuario, documento,apellido, nombres,  email, contrasenia, foto_path, rol, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_usuario, documento, apellido, nombres, email, contrasenia, foto_path, rol, activo]);
        res.status(201).send({
            estado: "OK",
            mensaje: "Usuario creado exitosamente",
            data: rows
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            mensaje: "Error al crear el usuario"
        });
    }
})

//Modificar un usuario 
app.put('/usuarios/:id', async (req, res) =>{
    const { id } = req.params;
    const { documento, apellido, nombres, email, contrasenia, foto_path, rol } = req.body;
    try {
        const [rows] = await conexion.execute('UPDATE usuarios SET documento = ?, apellido = ?, nombres = ?, email = ?, contrasenia = ?, foto_path = ?, rol = ? WHERE id_usuario = ?', [documento, apellido, nombres, email, contrasenia, foto_path, rol, id]);
        res.send({
            estado: "OK",
            mensaje: "Usuario modificado exitosamente",
            data: rows
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            mensaje: "Error al modificar el usuario"
        });
    }
})

//Eliminar un usuario (borrado lógico)
app.delete('/usuarios/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        const [rows] = await conexion.execute('UPDATE usuarios SET activo = 0 WHERE id_usuario = ?', [id]);
        res.send({
            estado: "OK",
            mensaje: "Usuario eliminado exitosamente",
            data: rows
        });
    } catch (error) {
        console.error("DETALLE:", error.sqlMessage || error);
        res.status(500).send({
            estado: "ERROR",
            mensaje: "Error al eliminar el usuario"
        });
    }
})



app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});