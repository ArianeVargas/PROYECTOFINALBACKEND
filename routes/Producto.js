import { Router } from "express";
import { check } from "express-validator";
import httpProducto from "../controllers/Producto.js";
import helpersLote from "../helpers/Lote.js";
import helpersGeneral from "../helpers/General.js";
import validarCampos from "../middlewares/validarcampos.js"
import helpersProducto from "../helpers/Producto.js";

const routers = Router();

routers.get('/productobusca', [validarCampos], httpProducto.getProductos);

routers.get('/Productobuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.getProductosId);

routers.post('/productocrear', [
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersProducto.existeCodigo),
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check("Descripcion", "Ingrese una Descripcion").not().isEmpty(),
    check("UnidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("PrecioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("PrecioUnitario", "El precio unitario debe ser mayor a 0").custom(
        helpersProducto.precioValido
    ),
    check("Iva", "Ingrese el Iva").not().isEmpty(),
    check("Lote_id", "Ingrese el lote").not().isEmpty(),
    check("Lote_id", "Id de lote no válida").isMongoId(),
    check("Lote_id").custom(helpersLote.existeId),
   
    validarCampos
], httpProducto.postProductos);

routers.put('/productomodificar/:id', [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersProducto.existeCodigo),
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check("Descripcion", "Ingrese una Descripcion").not().isEmpty(),
    check("UnidadMedida", "Ingrese la unidad de medida").not().isEmpty(),
    check("PrecioUnitario", "Ingrese un precio unitario").not().isEmpty(),
    check("PrecioUnitario", "El precio unitario debe ser mayor a 0").isFloat({
        gt: 0,
    }),
    check("Iva", "Ingrese el Iva").not().isEmpty(),
    check("Lote_id", "Ingrese el lote").not().isEmpty(),
    check("Lote_id", "Id de lote no válida").isMongoId(),
    check("Lote_id").custom(helpersLote.existeId),
    validarCampos
], httpProducto.putProductos);

routers.put('/inactivar/:id', [
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.putProductosInactivar);

routers.put('/activar/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpProducto.putProductosActivar);

export default routers;