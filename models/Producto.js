import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
import types from "mongoose"

const ProductoSchema = new mongoose.Schema({
    Codigo: { type: String, index: 'text', require: true, unique: true },
    Nombre: { type: String, require: true },
    Descripcion: { type: String, require: true },
    UnidadMedida: { type: String, require: true },
    PrecioUnitario: { type: Number, require: true },
    Iva: { type: Number, require: true },
    TipoProducto: { type: String, require: true },
    Cantidad: { type: Number, default: 0 },
    Lote_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Lote', require: true },
    Estado: { type: Boolean, default: 1 },
    createAT: { type: Date, default: Date.now }
})

export default mongoose.model("Producto", ProductoSchema)