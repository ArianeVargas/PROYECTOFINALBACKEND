import mongoose from "mongoose";

const disLoteDependenciaSchema = new mongoose.Schema({
    Codigo: { type: String, index:"text", require:true, unique:true},
    PresupuestoAsignado: { type:Number, require:true},
    PresupuestoDisponible: {type:Number, require:true},
    Dependencia_id:{type:mongoose.Schema.Types.ObjectId,ref:'DisDependencia', require:true},
    DistribucionContratoLote_id:{type:mongoose.Schema.Types.ObjectId,ref:'DistribucionContratoLote', require:true},
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});

export default mongoose.model("DistribucionLoteDependencia", disLoteDependenciaSchema)