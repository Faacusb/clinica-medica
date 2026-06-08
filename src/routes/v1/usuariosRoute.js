import express from "express";
import { param } from "express-validator";
import UsuariosController from "../../controllers/usuariosController.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get(
    "/",
    usuariosController.listarUsuarios
);

router.get(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    usuariosController.obtenerPorId
);

router.post(
    "/",
    usuariosController.crearUsuario
);

router.put(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    usuariosController.editarUsuario
);

router.delete(
    "/:id",
    param("id")
        .isInt()
        .withMessage("El ID debe ser numérico"),
    usuariosController.eliminarUsuario
);

export default router;