import express from "express";
import mysql from "mysql2/promise";
import conexion  from "./config/database.js";

const app = express();

app.use(express.json());

//  listar  pacientes   ok
  
app.get("/pacientes", async (req, res) => {
    try {
        
        const [rows] = await conexion.execute(
           "SELECT * FROM pacientes"
        );

        res.send({
            estado: "OK",
            data:rows
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
            msg: "Error al obtener pacientes"
        });
    }
});


//   buscar  pacientes ok

app.get('/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM pacientes WHERE  id_paciente = ?",
            [id]
        );

            
            [id]
        

 if (rows.length === 0) {
    return res.status(404).send({
        estado: "ERROR",
        msg: "Paciente no encontrado"
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
        msg: "No se pueden  obtener el paciente"
    });
}
});


// elimanar  pacientes revisar 

app.delete('/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await conexion.execute(
            "UPDATE pacientes SET activo = 0 WHERE id_paciente = ?",
            [id]
        );
        res.send({ estado: "OK", msg: "paciente eliminado correctamente" });
 }catch (error) {

    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pudo eliminar el  paciente"
    });
}
});


// crear pacientes ok 

app.post('/pacientes', async (req, res) => {
    const {   id_usuario, id_obra_social } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO pacientes ( id_usuario, id_obra_social) VALUES (?, ?)",
            [ id_usuario, id_obra_social]
        );
        res.send({
            estado: "OK",
            msg: "Paciente creado correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
        
 msg: "No se pudo crear el paciente"
        });
    }
});



// editar pacientes ok 


app.put('/pacientes/:id', async (req, res) => {

    const { id } = req.params;
    const { id_usuario, id_obra_social } = req.body;

    try {

        const [result] = await conexion.execute(
            `UPDATE pacientes
             SET id_usuario = ?, id_obra_social = ?
             WHERE id_paciente = ?`,
            [id_usuario, id_obra_social, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "Paciente no encontrado"
            });
        }

        res.send({
            estado: "OK",
            msg: "Paciente actualizado correctamente"
        });

    } catch (error) {

        console.log(error);

        res.status(500).send({
            estado: "ERROR",
            msg: "Error al actualizar paciente"
        });

    }
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});