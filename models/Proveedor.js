import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    Nombre: { type: String,  require:true },
    Apellido: { type: String,  require:true },
    Identificacion: { type: String, index: 'text', require:true, unique:true, minlength:7, maxlength: 10 },
    Correo: { type: String, index: 'text', require:true},
    Telefono: { type: String, required: true, unique:true, minlength:10, maxlength: 10, validate: /^\d{10}$/ }, 
    Empresa: { type: String, require:true },
    createAT : {type:Date,default: Date.now },
    Estado:{type:Boolean, default:1}
});


export default mongoose.model("Proveedor", proveedorSchema)