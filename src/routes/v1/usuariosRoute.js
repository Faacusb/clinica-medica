import express from "express";
import { param } from "express-validator";
import UsuariosController from "../../controllers/usuariosController.js";
import { validarCampos, validarId } from "../../middleware/validationMiddleware.js";

const router = express.Router();

const usuariosController = new UsuariosController();

router.get("/",usuariosController.listarUsuarios);
router.get("/:id",validarId, validarCampos,usuariosController.obtenerPorId);
router.post("/", validarCampos, usuariosController.crearUsuario);
router.put("/:id", validarId, validarCampos,usuariosController.editarUsuario);
router.delete("/:id", validarId, validarCampos, usuariosController.eliminarUsuario);

export default router;