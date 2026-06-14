import express from "express";
import apicache from "apicache";
import UsuariosController from "../../controllers/usuariosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionUsuario, validarUsuario } from "../../middleware/usuarioValidation.js";

const router = express.Router();

const cache = apicache.middleware;

const usuariosController = new UsuariosController();

router.get(
    "/",
    cache("5 minutes"),
    usuariosController.listarUsuarios
);

router.get(
    "/:id",
    cache("5 minutes"),
    validarId,
    validarCampos,
    usuariosController.obtenerPorId
);

router.post(
    "/",
    validarUsuario,
    validarCampos,
    usuariosController.crearUsuario
);

router.put(
    "/:id",
    validarId,
    validarActualizacionUsuario,
    validarCampos,
    usuariosController.editarUsuario
);

router.delete(
    "/:id",
    validarId,
    validarCampos,
    usuariosController.eliminarUsuario
);

export default router;