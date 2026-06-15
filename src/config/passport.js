import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import UsuariosService from "../services/usuariosService.js";

const estrategia = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "contrasenia"
    },
    async (email, contrasenia, done) => {

        try {

            const usuariosService = new UsuariosService();

            const usuario =
                await usuariosService.buscar(
                    email,
                    contrasenia
                );

            if (!usuario) {
                return done(
                    null,
                    false,
                    {
                        estado: false,
                        mensaje: "Login incorrecto"
                    }
                );
            }

            return done(
                null,
                usuario,
                {
                    estado: true,
                    mensaje: "Login correcto"
                }
            );

        } catch (error) {

            return done(error);
        }
    }
);

const validacion = new JwtStrategy(
    {
        jwtFromRequest:
            ExtractJwt.fromAuthHeaderAsBearerToken(),

        secretOrKey:
            process.env.JWT_SECRET
    },
    async (jwtPayload, done) => {

        try {

            const usuariosService =
                new UsuariosService();

            const usuario =
                await usuariosService.buscarPorId(
                    jwtPayload.id_usuario
                );

            if (!usuario) {
                return done(
                    null,
                    false,
                    {
                        mensaje: "Token inválido"
                    }
                );
            }

            return done(
                null,
                usuario
            );

        } catch (error) {

            return done(error, false);
        }
    }
);

export {
    estrategia,
    validacion
};