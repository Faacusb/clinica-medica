import { body } from 'express-validator';


//validacion de campos para crear un usuario
export const validarUsuario = [ 
    body('documento')
        .trim()
        .notEmpty()
        .withMessage('El documento es obligatorio')
        .isLength({ min: 8, max: 20 })
        .withMessage('El documento debe tener entre 8 y 20 caracteres'),

    body('apellido')
        .trim()
        .notEmpty()
        .withMessage('El apellido es obligatorio')
        .isLength({ max: 100 })
        .withMessage('El apellido no puede tener más de 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("Los nombres solo pueden contener letras y espacios"),

    body('nombres')
        .trim()
        .notEmpty()
        .withMessage('Los nombres son obligatorios')
        .isLength({ max: 100 })
        .withMessage('Los nombres no pueden tener más de 100 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Los nombres solo pueden contener letras y espacios'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('El email es obligatorio')
        .isLength({ max: 255 })
        .withMessage('El email no puede tener más de 255 caracteres')
        .isEmail()
        .withMessage('El email no es válido')
        .normalizeEmail(),
        

    body('contrasenia')
        .trim()
        .notEmpty()
        .withMessage('La contraseña es obligatoria')
        .isLength({ min: 6, max: 255 })
        .withMessage('La contraseña debe tener entre 6 y 255 caracteres'),
        

    body('foto_path')
        .trim()
        .optional({ nullable: true })
        .isLength({ max: 255 })
        .withMessage('La URL de la foto debe tener máximo 255 caracteres'),

    body('rol')
        .trim()
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isIn([1, 2, 3])
        .withMessage('El rol debe ser 1, 2 o 3')

];


export const validarActualizacionUsuario = [
    body("documento")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 8, max: 20 })
        .withMessage("El documento debe tener entre 8 y 20 caracteres"),

    body("apellido")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 })
        .withMessage("El apellido no puede tener más de 100 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("Los nombres solo pueden contener letras y espacios"),

    body("nombres")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 })
        .withMessage("Los nombres no pueden tener más de 100 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage("Los nombres solo pueden contener letras y espacios"),

    body("email")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 255 })
        .withMessage("El email no puede tener más de 255 caracteres")
        .isEmail()
        .withMessage("El email no es válido")
        .normalizeEmail(),

    body("contrasenia")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 6, max: 255 })
        .withMessage("La contraseña debe tener entre 6 y 255 caracteres"),

    body("foto_path")
        .optional({ nullable: true, checkFalsy: true })
        .trim()
        .isLength({ max: 255 })
        .withMessage("La URL de la foto debe tener máximo 255 caracteres"),

    body("rol")
        .optional({ checkFalsy: true })
        .trim()
        .isIn([1, 2, 3])
        .withMessage("El rol debe ser 1, 2 o 3"),
];

