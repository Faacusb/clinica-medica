import express from "express";
import apicache from "apicache";
import UsuariosController from "../../controllers/usuariosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";
import { validarActualizacionUsuario, validarUsuario } from "../../middleware/usuarioValidation.js";
import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authMiddleware.js";

const router = express.Router();

const cache = apicache.middleware;

const usuariosController = new UsuariosController();

router.get(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    usuariosController.listarUsuarios
);

router.get(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    cache("5 minutes"),
    validarId,
    validarCampos,
    usuariosController.obtenerPorId
);

router.post(
    "/",
    autenticarJWT,
    autorizarRoles(3),
    validarUsuario,
    validarCampos,
    usuariosController.crearUsuario
);

router.put(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarActualizacionUsuario,
    validarCampos,
    usuariosController.editarUsuario
);

router.delete(
    "/:id",
    autenticarJWT,
    autorizarRoles(3),
    validarId,
    validarCampos,
    usuariosController.eliminarUsuario
);

export default router;