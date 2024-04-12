import ConexRedLote from "../models/ConexionRedLote.js";

const httpConexRedLote = {
  getConexionRedLote: async (req, res) => {
    try {
      const conexion = await ConexRedLote.find()
        .populate("Red_id")
        .populate("Lote_id");
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getConexionRedLoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findById(id)
        .populate("Red_id")
        .populate("Lote_id");

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getPorLote: async (req, res) => {
    const Lote_id = req.params.Lote_id;

    try {
      const conexiones = await ConexRedLote.find({ Lote_id }).populate("Red_id").populate("Lote_id")
      res.json(conexiones);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorRed: async (req, res) => {
    const Red_id = req.params.Red_id;

    try {
      const conexiones = await ConexRedLote.find({ Red_id }).populate("Lote_id").populate("Red_id")

      res.json(conexiones);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  postConexionRedLote: async (req, res) => {
    try {
      const { Red_id, Lote_id } = req.body;

      const conexion = new ConexRedLote({
        Red_id,
        Lote_id,
      });
      await conexion.save();

      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  
  putConexionRedLote: async (req, res) => {
    try {
      const { id } = req.params;
      const { Red_id, Lote_id } = req.body;

      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        {
          Red_id,
          Lote_id,
        },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const conexion = await ConexRedLote.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      );
      res.json(conexion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpConexRedLote;
