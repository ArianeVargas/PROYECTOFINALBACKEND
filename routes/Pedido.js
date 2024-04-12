import { Router } from "express";
import { check } from "express-validator";
import httpPedido from "../controllers/Pedido.js";
import validarCampos from "../middlewares/validarcampos.js"

const routers = Router();

routers.get('/pedidobusca', [validarCampos], httpPedido.getPedidos);

routers.get('/pedidoabuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.getPedidosId);

routers.post('/pedidocrear', [
    check("InstructorEncargado_id", "Digite el ID de InstructorEncargado").not().isEmpty(),
    check("InstructorEncargado_id", "No es un Mongo ID válido").isMongoId(),
    check("InstructorEncargado_id").custom(helpersUsuario.existeHolderById),
    check("Destino_id", "Digite la Destino").not().isEmpty(),
    check("Destino_id", "No es un Mongo ID válido").isMongoId(),
    check("Destino_id").custom(helpersDestino.existeId),
    validarCampos
], httpPedido.postPedidos);

routers.put('/pedidomodificar/:id', [
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "No es un Mongo ID válido").isMongoId(),
    check("InstructorEncargado_id", "Digite el ID de InstructorEncargado").not().isEmpty(),
    check("InstructorEncargado_id", "No es un Mongo ID válido").isMongoId(),
    check("InstructorEncargado_id").custom(helpersUsuario.existeHolderById),
    check("Destino_id", "Digite la Destino").not().isEmpty(),
    check("Destino_id", "No es un Mongo ID válido").isMongoId(),
    check("Destino_id").custom(helpersDestino.existeId),
    validarCampos
], httpPedido.putPedidos);

/* routers.put('/pedidoinac/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.putInactivar);

routers.put('/pedidoact/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpPedido.putPedidosActivar); */

export default routers;
