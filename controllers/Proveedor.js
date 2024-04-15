import Proveedor from "../models/Proveedor.js";
import helpersGeneral from "../helpers/General.js";

const httpProveedor = {
  getProveedor: async (req, res) => {
    try {
      const proveedor = await Proveedor.find();
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getProveedorByCorreo: async (req, res) => {
    try {
      res.status(200).json({});
    } catch (error) {
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  postProveedor: async (req, res) => {
    try {
      const { Nombre, Apellido, Identificacion, Correo, Telefono, Empresa } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(Nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        Apellido.trim()
      );
      const proveedor = new Proveedor({
        Nombre: mayusNombre,
        Apellido: mayusApellido,
        Identificacion,
        Correo,
        Telefono,
        Empresa,
      });
      await proveedor.save();

      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putProveedor: async (req, res) => {
    try {
      const { id } = req.params;
      const { Nombre, Apellido, Identificacion, Correo, Telefono, Empresa } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(Nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        Apellido.trim()
      );

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        {
          Nombre: mayusNombre,
          Apellido: mayusApellido,
          Identificacion,
          Correo,
          Telefono,
          Empresa,
        },
        { new: true }
      );

      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json(proveedor);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpProveedor;
