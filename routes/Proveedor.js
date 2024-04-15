import { Router } from "express";
import httpProveedor from "../controllers/proveedor.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersProveedor from "../helpers/Proveedor.js";

const router = new Router();


router.get("/proveedorbusca", [validarJWT], httpProveedor.getAll);


router.post(
  "/registro",
  [
    validarJWT,
    check("Nombre", "Digite el Nombre").not().isEmpty(),
    check("Apellido", "Digite el Apellido").not().isEmpty(),
    check("Identificacion", "Digite la Identificacion").not().isEmpty(),
    check("Identificacion").custom(helpersProveedor.existeIdentificacion),
    check("Correo", "Digite el Correo").not().isEmpty(),
    check("Correo", "Dirección de Correo no válida").isEmail(),
    check("Correo").custom(helpersProveedor.existeCorreo),
    check("Telefono", "Digite el Telefono").not().isEmpty(),
    check("Telefono").custom(helpersProveedor.existeTelefono),
    check("Empresa", "Ingrese la Empresa").not().isEmpty(),
    validarCampos,
  ],
  httpProveedor.postProveedor
);

router.put(
  "/editar/:id",
  [
    validarJWT,
    check("id", "Ingrese una id").not().isEmpty(),
    check("id", "Id no válida").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    check("Nombre", "Digite el Nombre").not().isEmpty(),
    check("Apellido", "Digite el Apellido").not().isEmpty(),
    check("Identificacion", "Digite la Identificacion").not().isEmpty(),
    check("Identificacion").custom(helpersProveedor.existeIdentificacion),
    check("Correo", "Digite el Correo").not().isEmpty(),
    check("Correo", "Dirección de Correo no válida").isEmail(),
    check("Correo").custom(helpersProveedor.existeCorreo),
    check("Telefono", "Digite el Telefono").not().isEmpty(),
    check("Telefono").custom(helpersProveedor.existeTelefono),
    check("Empresa", "Ingrese la Empresa").not().isEmpty(),
    validarCampos,
  ],
  httpProveedor.putProveedor
);

router.put(
  "/inactivar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    validarCampos,
  ],
  httpProveedor.putInactivar
);
router.put(
  "/activar/:id",
  [
    validarJWT,
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("id").custom(helpersProveedor.existeId),
    validarCampos,
  ],
  httpProveedor.putActivar
);

export default router;
