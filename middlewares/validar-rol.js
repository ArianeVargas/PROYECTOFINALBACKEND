import jwt from "jsonwebtoken";
import Usuario from "../models/Usuarios.js"

const validarRolAdmin = async(req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid)

    if(usuario.Rol!="admin"){
      return res.status(401).json({msg: "Rol no autorizado"})
    }

    next()
  } catch (error) {}
};

const validarRolInstructor = async(req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid)

    if(usuario.Rol!="instructor" && usuario.Rol!="admin"){
      return res.status(401).json({msg: "Rol no autorizado"})
    }

    next()
  } catch (error) {}
};

const validarRolBodega = async(req, res, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid)

    if(usuario.Rol!="admin" && usuario.Rol!="bodega"){
      return res.status(401).json({msg: "Rol no autorizado"})
    }

    next()
  } catch (error) {}
};

export  {validarRolAdmin, validarRolInstructor, validarRolBodega}