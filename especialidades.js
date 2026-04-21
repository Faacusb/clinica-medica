import express from "express";
import mysql from "mysql2/promise";

const app = express();

app.use(express.json());

const conexion = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prog3_turnos"
});

// //  lista por id todoas las especialidades cargfadas  en la base de datos   OK
app.get('/especialidades', async (req, res) => {
try {
        const [rows] = await conexion.execute(
            "SELECT * FROM especialidades"
        ); 
        res.send({
            estado: "OK",
            data :rows
        });
 }catch (error) {
    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pueden  obtener las especialidades"
    });
}
});

// buscar por el ID  LA ESPECIALIDAD  una 
app.get('/especialidades/:id', async (req, res) => {
    const { id } = req.params;
try {
        const [rows] = await conexion.execute(
            "SELECT * FROM especialidades WHERE  id_especialidad = ?",
           
            
            [id]
        );

 if (rows.length === 0) {
    return res.status(404).send({
        estado: "ERROR",
        msg: "Especialidad no encontrada"
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
        msg: "No se pueden  obtener la especialidad"
    });
}
});

// // // put  ediatar una  especialidad por su  id   
app.put('/especialidades/:id', async (req, res) => {
    const { nombre } = req.body;
    const id = Number(req.params.id);
try {
        const [result] = await conexion.execute(
            "UPDATE especialidades SET nombre = ? WHERE id_especialidades = ?",
            


            [nombre, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({
                estado: "ERROR",
                msg: "No existe esa especialidad"
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
           
        });
    }
});

// delete eliminar una especialidad por su id 
 app.delete ('/especialidades/:id', async (req, res) => {
   
    console.log ("especialidades ")
    try {
   const { id } = req.params;     
    
const [result] = await conexion.execute(
"DELETE FROM `especialidades` WHERE id_especialidades =?;"
   

[ id]

);
 res.send({
            estado: "OK",
            msg: "Especialidad  eliminada correctamente"
        });

 }catch (error) {

    console.log(error);
    res.status(500).send({
        estado: "ERROR",
        msg: "No se pudo eliminar la especialidad"
    });
}
});

// post crar la especialidad  OK
const crearEspecialidad = async (req, res) => {
    const { nombre } = req.body;
    try {
        await conexion.execute(
            "INSERT INTO especialidades (nombre) VALUES (?)",
            [nombre]
        );
        res.send({
            estado: "OK",
            msg: "Especialidad creada correctamente"
        });

    } catch (error) {
        console.log(error);

        res.status(500).send({
            estado: "ERROR",
        
 msg: "No se pudo crear la especialidad"
        });
    }
};

app.post('/especialidades', crearEspecialidad);
app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});











