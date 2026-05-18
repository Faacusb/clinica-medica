
import express from "express";
import mysql from "mysql2/promise";
import conexion  from "./config/database.js";

const app = express();

app.use(express.json());

// buscar  las obras sociales  todas ok

app.get("/obras_sociales", async (req, res) => {
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM obras_sociales"
        );

        res.send({
            estado: "OK",

            data: rows
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
            msg: "Error al obtener obras sociales"
        });
    }
});


//   buscar una obra social por su id  ok

app.get('/obras_sociales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM obras_sociales WHERE  id_obra_social = ?",
           
            
            [id]
        );

 if (rows.length === 0) {
    return res.status(404).send({
        estado: "ERROR",
        msg: "Obra social no encontrada"
    });
} 
        res.send({
            estado: "OK",
            data :rows[0]
        });
 }catch (error) {
    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pueden  obtener la obra social"
    });
}
});


// eliminar obra social  ok

app.delete('/obras_sociales/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await conexion.execute(
            "UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?",
            [id]
        );
        res.send({ estado: "OK", msg: "obra social eliminada correctamente" });
 }catch (error) {

    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pudo eliminar la  obra social"
    });
}
});

// // crear una  obras social   OK
 
app.post('/obras_sociales', async (req, res) => {
    const { nombre, descripcion,porcentaje_descuento,es_particular,activo } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO obras_sociales ( nombre, descripcion, porcentaje_descuento, es_particular, activo) VALUES (?, ?, ?, ?, ?)",
            [ nombre, descripcion, porcentaje_descuento, es_particular, activo]
        );
        res.send({
            estado: "OK",
            msg: "Obra social creada correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
        
 msg: "No se pudo crear la obra social"
        });
    }
});

// // //  editar una obra social   OK
app.put('/obras_sociales/:id', async (req, res) => { 
    const {   nombre, descripcion,porcentaje_descuento,es_particular,activo } = req.body;
     const { id } = req.params;
    
try {
        const [result] = await conexion.execute(
            "UPDATE obras_sociales SET nombre = ?, descripcion = ?, porcentaje_descuento = ?, es_particular = ?, activo = ? WHERE id_obra_social = ?",
            
            [nombre, descripcion, porcentaje_descuento, es_particular, activo, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "No existe esa obra social"
            });
        }
        res.send({
            estado: "OK",
            msg: "Actualizada correctamente"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            estado: "ERROR",
            msg: "Error al actualizar la obra social"
        });
    }
});


app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});