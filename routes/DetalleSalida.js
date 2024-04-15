import { Router } from "express";
import httpDetSalida from "../controllers/DetalleSalida.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDetSalida from "../helpers/DetalleSalida.js";
import helpersSalida from "../helpers/Salida.js";
import helpersProducto from "../helpers/Producto.js";

const router = new Router();

router.get("/detallesalidabusca", [validarJWT], httpDetSalida.getDetalleSalida);

router.get(
    "/detallesalidabuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check("id").custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.getDetalleSalidaById
);

router.get("/detallesalidabuscasalida/:Salida_id", [
    validarJWT,
    check("Salida_id", "Ingrese el salida").not().isEmpty(),
    check("Salida_id", "Id de salida no válida").isMongoId(),
    check("Salida_id").custom(helpersSalida.existeId),
    validarCampos,
], httpDetSalida.getDetalleSalidaBySalida);

router.post(
    "/detallesalidacrear",
    [
        validarJWT,
        check("Cantidad", "Digite la Cantidad").not().isEmpty(),
        check("Cantidad", "Tipo de dato no válido para Cantidad").isNumeric(),
        check("Salida_id", "Digite el id del salida").not().isEmpty(),
        check("Salida_id", "No es Mongo Id").isMongoId(),
        check("Salida_id").custom(helpersSalida.existeId),
        check("Producto_id", "Digite un producto").not().isEmpty(),
        check("Producto_id", "Producto no válido").isMongoId(),
        check("Producto_id").custom(helpersProducto.existeId),
        validarCampos,
    ],
    httpDetSalida.postDetalleSalida
);

router.put(
    "/detallesalidamodificar/:id",
    [
        validarJWT,
        check("Producto_id", "Digite un producto").not().isEmpty(),
        check("Producto_id", "Producto no válido").isMongoId(),
        check("Producto_id").custom(helpersProducto.existeId),
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check("Salida_id", "Digite el id del salida").not().isEmpty(),
        check("Salida_id", "No es Mongo Id").isMongoId(),
        check("Salida_id").custom(helpersDetSalida.existeId),
        check("Cantidad", "Digite la Cantidad").not().isEmpty(),
        check("Cantidad", "Tipo de dato no válido para Cantidad").isNumeric(),
        validarCampos,
    ],
    httpDetSalida.putDetalleSalida
);

router.put(
    "/inactivar/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check('id').custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.putInactivar
);

router.put(
    "/activar/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check('id').custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.putActivar
);

export default router;
