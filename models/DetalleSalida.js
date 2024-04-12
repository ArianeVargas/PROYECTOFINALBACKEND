import mongoose from "mongoose";

const detSalidaSchema = new mongoose.Schema({
    CantidadEntregada: { type: Number, require: true },
    CantidadPendiente: { type: Number, require: true },
    Salida_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Salida', require: true },
    Producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', require: true },
    SubTotal: { type: Number },
    Estado: { type: Boolean, default: 1 },
    createAT: { type: Date, default: Date.now }
})


export default mongoose.model("DetalleSalida", detSalidaSchema)