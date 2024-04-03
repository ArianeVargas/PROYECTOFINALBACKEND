import Proceso from "../models/Proceso.js";

const httpProceso = {
  getProceso: async (req, res) => {
    try {
      const proceso = await Proceso.find()
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getProcesoById: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findById(id)
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },


  postProceso: async (req, res) => {
    try {
      const { PresupuestoAsignado, Codigo } = req.body;

      const proceso = new Proceso({
        PresupuestoAsignado,
        PresupuestoDisponible: PresupuestoAsignado,
        Codigo,
      });
      await proceso.save();

      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

 
  putProceso: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado, Codigo } = req.body;

      const proceso = await Proceso.findByIdAndUpdate(
        id,
        {
          PresupuestoAsignado,
          PresupuestoDisponible: PresupuestoAsignado,
          Codigo,
        },
        { new: true }
      )
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putAjustarPresupuesto: async (req, res) => {
    try {
      const { id } = req.params;
      const { PresupuestoAsignado } = req.body;

      const proceso = await Proceso.findById(id);
      const presupuestoDisponible =
        proceso.PresupuestoDisponible - PresupuestoAsignado;

      const procesoUpdate = await Proceso.findByIdAndUpdate(
        id,
        { presupuestoDisponible },
        { new: true }
      )

      res.json(procesoUpdate);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findByIdAndUpdate(
        id,
        { Estado: 0 },
        { new: true }
      )
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const proceso = await Proceso.findByIdAndUpdate(
        id,
        { Estado: 1 },
        { new: true }
      )
      res.json(proceso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },
};
export default httpProceso;
