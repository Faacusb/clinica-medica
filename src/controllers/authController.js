import jwt from "jsonwebtoken";
import passport from "passport";

export default class AuthController {

    login = async (req, res, next) => {

        passport.authenticate(
            "login",
            { session: false },
            (error, usuario, info) => {

                if (error) {
                    return res.status(500).json({
                        estado: "ERROR",
                        mensaje: error.message
                    });
                }

                if (!usuario) {
                    return res.status(401).json(info);
                }

                const token = jwt.sign(
                    {
                        id_usuario: usuario.id_usuario,
                        rol: usuario.rol
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h"
                    }
                );

                return res.json({
                    estado: "OK",
                    token,
                    usuario
                });
            }
        )(req, res, next);
    };
}