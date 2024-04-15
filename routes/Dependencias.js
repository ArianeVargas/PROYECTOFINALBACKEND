import { Router } from "express";
import httpDependencia from "../controllers/DependeNcias.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
// import helpersPresupuesto from "../helpers/Presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersDependencia from "../helpers/Dependencias.js";

const router=new Router()

router.get('/dependenciabusca', validarJWT, httpDependencia.getDependencia)
router.get('/dependenciabuscanombre/:Nombre', validarJWT, httpDependencia.getDependenciaNombre) 
router.get('/dependenciabuscaid/:id', [ 
  validarJWT,
  validarRolAdmin,
  check('id', 'Digite el id').not().isEmpty(),
  check('id', 'Digite el id').isMongoId(),
  validarCampos,
], httpDependencia.getDependenciaId) 



router.post('/dependenciacrear',[
  validarJWT,
  validarRolAdmin,
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check('Nombre').custom(helpersDependencia.existeNombre),
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersDependencia.existeCodigo),
    validarCampos
],httpDependencia.postDependencia)


router.put('/dependenciamodificar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check('Nombre').custom(helpersDependencia.existeNombre),
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersDependencia.existeCodigo),
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