import mongoose from "mongoose";

const procesoSchema = new mongoose.Schema({
    Codigo: {type: String, require: true},
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: { type:Number, require:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});


export default mongoose.model("Proceso", procesoSchema)