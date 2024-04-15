import { Router } from "express";
import httpDependencia from "../controllers/Dependencias.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersDependencia from "../helpers/Dependencias.js";

const router=new Router()

// Get
router.get('/dependenciabusca', validarJWT, httpDependencia.getDependencia)
router.get('/dependenciabuscanombre/:Nombre', validarJWT, httpDependencia.getDependenciaNombre) 
router.get('/dependenciabuscaid/:id', [ 
  validarJWT,
  validarRolAdmin,
  check('id', 'Digite el id').not().isEmpty(),
  check('id', 'Digite el id').isMongoId(),
  validarCampos,
], httpDependencia.getDependenciaId) 


// Post
router.post('/dependenciacrear',[
  validarJWT,
  validarRolAdmin,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersDependencia.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersDependencia.existeCodigo),
    validarCampos
],httpDependencia.postDependencia)

// Put
router.put('/dependenciamodificar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersDependencia.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersDependencia.existeCodigo),
    validarCampos
], httpDependencia.putEditar)

router.put('/ajustarpresupuesto/:id',[
  validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos,
],httpDependencia.putAjustarPresupuesto)

router.put('/inactivar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDependencia.putInactivar)

router.put('/activar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDependencia.putActivar)

export default router