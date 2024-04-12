import Destino from "../models/Destino.js";

const helpersDestino = {
  existeId: async (id, req) => {
    const destino = await Destino.findById(id);
    if (!destino) {
      throw new Error(`Destino no encontrado`);
    }

    req.DestinoUpdate = destino;
  },

  validarFechas: async (fechaInicio, req) => {
    const fechaActual = new Date();
    const fechaFin = req.req.body.fechaFin;

    if (fechaInicio <= fechaActual) {
      throw new Error("La fecha de inicio debe ser mayor que la fecha actual");
    }
    if (fechaFin <= fechaInicio) {
      throw new Error("La fecha de fin debe ser mayor a la de inicio");
    }
  },
  validarDestinoUnica: async (codigo) => {
    const existe = await Destino.findOne({ codigo });

    if (existe) {
      throw new Error("El destino ya esta registrado");
    }
  },
  validarDestinoUnicaEditar: async (id, codigo) => {
    try {
      const DestinoExiste = await Destino.findOne({
        codigo,
        _id: { $ne: id },
      });

      if (DestinoExiste) {
        throw new Error("Ya existe un destino con este codigo");
      }

      return true;
    } catch (error) {
      throw error;
    }
  },
};
export default helpersDestino;
