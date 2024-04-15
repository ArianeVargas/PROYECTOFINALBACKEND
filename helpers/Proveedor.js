import Proveedor from "../models/Proveedor.js";

const helpersProveedor = {
  existeId: async (id, req) => {
    const existe = await Proveedor.findById(id);

    if (!existe) {
      throw new Error(`El proveedor no existe ${id}`);
    }

    req.req.ProveedorUpdate = existe;
  },

  existeTelefono: async (Telefono, req) => {
    const existe = await Proveedor.findOne({ Telefono  });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese teléfono en la base de datos!!! `);
      }
    }

    req.req.ProveedorUpdate = existe;
  },

  existeCorreo: async (Correo, req) => {
    const existe = await Proveedor.findOne({ Correo });

    if (!existe && req.req.method === "GET") {
      throw new Error(`El Correo no se encuentra registrado`);
    }

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese Correo en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese Correo en la base de datos!!! `);
      }
    }

    req.req.ProveedorUpdate = existe;
  },

  existeIdentificacion: async (Identificacion, req) => {
    const existe = await Proveedor.findOne({
      $text: { $search: Identificacion },
    });

    if (existe) {
      if (req.req.method === "PUT" && req.req.body._id != existe._id) {
        throw new Error(`Ya existe ese Identificacion en la base de datos!!! `);
      } else if (req.req.method === "POST") {
        throw new Error(`Ya existe ese Identificacion en la base de datos!!! `);
      }
    }

    req.req.ProveedorUpdate = existe;
  },
};
export default helpersProveedor;
