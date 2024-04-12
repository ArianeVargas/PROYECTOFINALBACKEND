import { Router } from "express";
import { check } from "express-validator";
import httpDetallePedido from "../controllers/DetallePedido.js";
import validarCampos from "../middlewares/validarcampos.js"
import helpersDetallePedido from "../helpers/DetallePedido.js";
import helpersPedido from "../helpers/Pedido.js";

const routers = Router()

routers.get('/detallepedidobusca', [validarCampos], httpDetallePedido.getDetallePedido);

routers.get('/detallepedidobuscaid/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  check("id").custom(helpersDetallePedido.existeId),
  validarCampos
], httpDetallePedido.getDetallePedidoId);

routers.get("/detallepedidobuscapedido/:Pedido_id", [
  check("Pedido_id", "Ingrese el pedido").not().isEmpty(),
  check("Pedido_id", "Id de pedido no válida").isMongoId(),
  check("Pedido_id").custom(helpersPedido.existeId),
  validarCampos,
], httpDetallePedido.getByPedido);

routers.post('/detallepedidocrear', [
  check("Cantidad", "Cual es la cantidad").not().isEmpty(),
  check("Cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
  check("SubTotal", "Cual es el subtotal").not().isEmpty(),
  check("Pedido_id", "Digite el pedidoId").not().isEmpty().isMongoId(),
  check("Pedido_id").custom(helpersPedido.existeId),
  check("Producto_id", "Digite el productoId").not().isEmpty().isMongoId(),
  validarCampos
], httpDetallePedido.postDetallePedido);

routers.put('/detallepedidomodificar/:id', [
  check("id", "Digite el id").not().isEmpty().isMongoId(),
  check("Pedido_id").custom(helpersDetallePedido.existeId),
  check("Cantidad", "Es necesaria una cantidad").not().isEmpty(),
  check("Pedido_id", "Es necesario el id del pedido").not().isEmpty().isMongoId(),
  check("Cantidad", "Tipo de dato no válido para cantidad").isNumeric(),

  validarCampos
], httpDetallePedido.putEditarDetallePedido);

routers.put('inactivar/:id', [
  check("id").custom(helpersDetallePedido.existeId),
  check("id", "Digite el id").not().isEmpty(),
  check("id", "No es Mongo Id").isMongoId(),
  validarCampos
], httpDetallePedido.putDetallePedidoInactivar)

routers.put('/activar/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "No es Mongo Id").isMongoId(),
  validarCampos
], httpDetallePedido.putDetallePedidoActivar);


export default routers;