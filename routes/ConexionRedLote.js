import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpConexRedLote from "../controllers/ConexionRedLote.js";
import helpersConexionRedLote from "../helpers/ConexionRedLote.js";
import helpersRedConocimiento from "../helpers/RedConocimiento.js";
import helpersLote from "../helpers/Lote.js";

const router = new Router();


router.get("/conexionredlotebusca", validarJWT, httpConexRedLote.getConexionRedLote);


router.get(
    "/conexionrdelotebuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el id de la conexión").not().isEmpty(),
        check("id", "El id es invalido").isMongoId(),
    ],
    validarCampos,
    httpConexRedLote.getConexionRedLoteById
);

router.get("/conexionredlotebuscalote/:Lote_id",
    [
        validarJWT,
        check("Lote_id", "Digite el id del lote").not().isEmpty(),
        check("Lote_id", "El id es invalido").isMongoId(),
    ],
    validarCampos,
    httpConexRedLote.getPorLote
);

router.get("/conexionredlotebuscared/:Red_id",
    [
        validarJWT,
        check("Red_id", "Digite el id de la red de conocimiento").not().isEmpty(),
        check("Red_id", "El id es invalido").isMongoId(),
    ],
    validarCampos,
    httpConexRedLote.getPorRed
);


router.post(
    "/coneionredlotecrear",
    [
        validarJWT,
        check("Codigo",).custom(helpersConexionRedLote.existeCodigo),
        check("Red_id", "Seleccione una red").not().isEmpty(),
        check("Red_id", "El id es invalido").isMongoId(),
        check('Red_id').custom(helpersRedConocimiento.existeId),
        check("Lote_id", "Seleccione un lote").not().isEmpty(),
        check("Lote_id", "El id es invalido").isMongoId(),
        check('Lote_id').custom(helpersLote.existeId),
        check("Lote_id").custom(helpersConexionRedLote.existeConexion),
        validarCampos,
    ],
    httpConexRedLote.postConexionRedLote
);


router.put(
    "/conexionredlotemodificar/:id",
    [
        validarJWT,
        check("id", "Digite el id de la conexión").not().isEmpty(),
        check("id", "El id es invalido").isMongoId(),
        check("Codigo",).custom(helpersConexionRedLote.existeCodigo),
        check("Red_id", "Seleccione una red").not().isEmpty(),
        check("Red_id", "El id es invalido").isMongoId(),
        check("Red_id", "Red no valida").custom(helpersRedConocimiento.existeId),
        check("Lote_id", "Seleccione un lote").not().isEmpty(),
        check("Lote_id", "El id es invalido").isMongoId(),
        check('Lote_id').custom(helpersLote.existeId),
        check("Lote_id").custom(helpersConexionRedLote.existeConexion),
        validarCampos
    ],
    httpConexRedLote.putConexionRedLote
);


router.put(
    "/inactivar/:id",
    [validarJWT, check("id", "Digite el id de la conexión").not().isEmpty(), check("id", "El id es invalido").isMongoId()],
    validarCampos,
    httpConexRedLote.putInactivar
);


router.put(
    "/activar/:id",
    [validarJWT, check("id", "Digite el id de la conexión").not().isEmpty(), check("id", "El id es invalido").isMongoId()],
    validarCampos,
    httpConexRedLote.putActivar
);

export default router;