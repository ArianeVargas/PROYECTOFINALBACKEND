import DisLoteDependencia from "../models/DistribucionLoteDependencia.js";

const httpDisLoteDependencia = {
  getDisLoteDep: async (req, res) => {
    try {
      const distribucion = await DisLoteDependencia.find()
        .populate("DistribucionContratoLote_id")
        .populate("DistribucionDependencia_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getDisLoteDepById: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findById(id)
        .populate("DistribucionContratoLote_id")
        .populate("DistribucionDependencia_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Post
  postDisLoteDep: async (req, res) => {
    try {
      const { Codigo, PresupuestoAsignado, DistribucionContratoLote_id, DistribucionDependencia_id } = req.body;

      const distribucion = new DisLoteDependencia({
        Codigo,
        PresupuestoAsignado,
        PresupuestoDisponible: PresupuestoAsignado,
        DistribucionContratoLote_id,
        DistribucionDependencia_id,
        Año,
      });
      await distribucion.save();

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },


  putDisLoteDep: async (req, res) => {
    try {
      const { id } = req.params;
      const { Codigo, PresupuestoAsignado, DistribucionContratoLote_id, DistribucionDependencia_id, Año } = req.body;

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        {
          Codigo,
          PresupuestoAsignado,
          PresupuestoDisponible,
          DistribucionContratoLote_id,
          DistribucionDependencia_id,
          Año,
        },
        { new: true }
      )
        .populate("DistribucionContratoLote_id")
        .populate("DistribucionDependencia_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoDisponible } = req.body;

      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { PresupuestoDisponible },
        { new: true }
      )
        .populate("DistribucionContratoLote_id")
        .populate("DistribucionDependencia_id");

      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      ).populate("DistribucionContratoLote_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const distribucion = await DisLoteDependencia.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      ).populate("DistribucionContratoLote_id");
      res.json(distribucion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpDisLoteDependencia;
