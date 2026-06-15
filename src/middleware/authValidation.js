import passport from "passport";

export const autenticarJWT = passport.authenticate(
    "jwt",
    { session: false }
);

export const autorizarRoles = (...rolesPermitidos) => {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                estado: "ERROR",
                mensaje: "Usuario no autenticado"
            });
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                estado: "ERROR",
                mensaje: "No tiene permisos para acceder a este recurso"
            });
        }

        next();
    };
};