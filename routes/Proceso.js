import { Router } from "express"
import httpProceso from "../controllers/Proceso.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
// import helpersPresupuesto from "../helpers/presupuesto.js";
// import helpersProceso from "../helpers/Proceso.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router=new Router()


router.get('/procesobusca', validarJWT, httpProceso.getProceso);


router.get('/procesobuscaid/:id',[
    validarJWT,
    validarRolAdmin,
    check('id','Ingrese el Proceso').not().isEmpty(),
    check('id','Valor no valido').isMongoId(),
    validarCampos
],httpProceso.getProcesoById)


router.post('/procesocrear',[
    validarJWT,
    validarRolAdmin,
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    // check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('Codigo', 'Ingrese el código').not().isEmpty(),
    // check('Proceso_id', 'Ingrese el proceso').not().isEmpty(),
    // check('Proceso_id').custom(helpersProceso.existeId),
    validarCampos
],httpProceso.postProceso)


router.put('/procesomodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    // check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('Codigo', 'Ingrese el código').not().isEmpty(),
    validarCampos
], httpProceso.putProceso)

router.put('/ajustarpresupuesto/:id',[
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpProceso.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpProceso.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpProceso.putActivar)

export default router
