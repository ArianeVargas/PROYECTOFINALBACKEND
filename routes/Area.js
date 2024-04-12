import { Router } from "express";
import { check } from "express-validator";
import httpArea from "../controllers/Area.js";
import helpersGeneral from "../helpers/General.js";
import validarCampos from "../middlewares/validarcampos.js";
import helpersArea from "../helpers/Area.js";
const routers = Router();

routers.get(
  "/areabusca",
  [validarCampos],

  httpArea.getArea
);

routers.get(
  "/areabuscaid/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es MOngo ID").isMongoId(),
    validarCampos,
  ],
  httpArea.getAreaId
);

routers.post(
  "/areacrear",
  [
    check("Nombre", "Nombre del área").not().isEmpty(),
    check("Nombre").custom(helpersArea.validarAreaUnica),
    check("Nombre").custom(helpersGeneral.verificarEspacios),
    validarCampos,
  ],
  httpArea.postArea
);

routers.put(
  "/areamodificar/:id",
  [
    check("Nombre", "Nombre del área").not().isEmpty(),
    check("Nombre", "Nombre ya registrado").custom((value, { req }) => {
      const { id } = req.params;
      return helpersArea.validarAreaUnicaEditar(id, value);
    }),
    check("Nombre").custom(helpersGeneral.verificarEspacios),
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo el id").isMongoId(),
    validarCampos,
  ],
  httpArea.putArea
);

routers.put(
  "/inactivar/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
  ],
  httpArea.putAreaInactivar
);

routers.put(
  "/activar/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
  ],
  httpArea.putAreaActivar
);

export default routers;
