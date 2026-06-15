import express from "express";
import { check } from "express-validator";

import AuthController from "../../controllers/authController.js";
import { validarCampos } from "../../middleware/validationMiddleware.js";

import {
    autenticarJWT,
    autorizarRoles
} from "../../middleware/authValidation.js";

const router = express.Router();

const authController = new AuthController();

router.post(
    "/login",
    [
        check("email")
            .notEmpty()
            .withMessage("El correo electrónico es requerido")
            .isEmail()
            .withMessage("Formato de correo inválido"),

        check("contrasenia")
            .notEmpty()
            .withMessage("La contraseña es requerida"),

        validarCampos
    ],
    authController.login
);

router.get(
    "/perfil",
    autenticarJWT,
    (req, res) => {

        res.json({
            estado: "OK",
            usuario: req.user
        });
    }
);

router.get(
    "/admin",
    autenticarJWT,
    autorizarRoles(1),
    (req, res) => {

        res.json({
            estado: "OK",
            mensaje: "Bienvenido administrador",
            usuario: req.user
        });
    }
);
export default router;