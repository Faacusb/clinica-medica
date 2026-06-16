import { body } from "express-validator";

export const validarTurnoReserva = [
    body("id_medico")
        .notEmpty()
        .withMessage("El medico es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El medico debe ser un ID numerico valido")
        .toInt(),

    body("id_paciente")
        .notEmpty()
        .withMessage("El paciente es obligatorio")
        .isInt({ min: 1 })
        .withMessage("El paciente debe ser un ID numerico valido")
        .toInt(),

    body("fecha_hora")
        .notEmpty()
        .withMessage("La fecha y hora del turno es obligatoria")
        .isISO8601()
        .withMessage("La fecha y hora debe tener un formato valido")
        .toDate()
];

export const validarActualizacionTurnoReserva = [
    body("id_medico")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("El medico debe ser un ID numerico valido")
        .toInt(),

    body("id_paciente")
        .optional({ checkFalsy: true })
        .isInt({ min: 1 })
        .withMessage("El paciente debe ser un ID numerico valido")
        .toInt(),

    body("fecha_hora")
        .optional({ checkFalsy: true })
        .isISO8601()
        .withMessage("La fecha y hora debe tener un formato valido")
        .toDate()
];

