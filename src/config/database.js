import mysql from "mysql2/promise";
process.loadEnvFile(); // Carga las variables de entorno desde el archivo .env
// Creacion de la conexion a la base de datos
let conexion;

try {
    conexion = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    });

    console.log("Conexión a la base de datos establecida correctamente");

} catch (error) {
    console.error("Error al conectar a la base de datos:", error);
}

export default conexion;
  