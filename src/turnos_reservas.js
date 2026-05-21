import express from "express";
import mysql from "mysql2/promise";
import conexion  from "./config/database.js";

const app = express();

app.use(express.json());


// listar  los turnos_reserva ok

app.get("/turnos_reservas", async (req, res) => {
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM turnos_reservas"
        );

        res.send({
            estado: "OK",

            data: rows
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
            msg: "Error al obtener turnos y reservas"
        });
    }
});


// //   buscar un turno_reservas por su id  ok


app.get('/turnos_reservas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await conexion.execute(
            "SELECT * FROM turnos_reservas WHERE  id_turno_reserva = ?",
           
            
            [id]
        );

 if (rows.length === 0) {
    return res.status(404).send({
        estado: "ERROR",
        msg: "Turno no encontrado"
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
        msg: "No se pueden  obtener el turno"
    });
}
});

//  eliminar  un turno_reservas   ok
app.delete('/turnos_reservas/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await conexion.execute(
            "UPDATE turnos_reservas SET activo = 0 WHERE id_turno_reserva = ?",
            [id]
        );
        res.send({ estado: "OK", msg: "turno eliminado correctamente" });
 }catch (error) {

    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pudo eliminar el  turno"
    });
}
});


// // //  editar un turno_reservas   ok
app.put('/turnos_reservas/:id', async (req, res) => {
    const {   id_medico, id_paciente, id_obra_social, fecha_hora, valor_total,atentido,activo } = req.body;
    const { id } = req.params;

    try {
        const [result] = await conexion.execute(
            "UPDATE turnos_reservas SET id_medico = ?, id_paciente = ?, id_obra_social = ?, fecha_hora = ?, valor_total = ?, atentido = ?, activo = ? WHERE id_turno_reserva = ?",
            
            [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total  ,atentido , activo, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "No existe ese turno"
            });
        }
        res.send({
            estado: "OK",
            msg: " Turno actualizado correctamente"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            estado: "ERROR",
            msg: "Error al actualizar el turno"
        });
    }
});


// crear un turno_reserva ok 

app.post('/turnos_reservas', async (req, res) => {
    const {   id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO turnos_reservas (id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [id_medico, id_paciente, id_obra_social, fecha_hora, valor_total, atentido, activo]
        );
        res.send({
            estado: "OK",
            msg: "Turno creado correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
        
 msg: "No se pudo crear el turno"
        });
    }
});


app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});