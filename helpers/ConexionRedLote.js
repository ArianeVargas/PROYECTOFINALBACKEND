import conexionRedLote from "../models/ConexionRedLote.js";

const helpersConexionRedLote = {
    existeConexion: async (Lote_id, req) => {
        const { Red_id } = req.req.body
        if (Lote_id && Red_id) {
            const existe = await conexionRedLote.findOne({
                Lote_id, Red_id
            });
            if (existe) {
                if (req.req.method === "PUT" && req.req.body._id.toString() !== existe._id.toString()) {
                    throw new Error(`Ya existe esta conexion!!!`);
                } else if (req.req.method === "POST") {
                    throw new Error(`Ya existe esta conexion!!!`);
                }
            }
        }
    },
    existeCodigo: async (Codigo, req) => {
        if (Codigo) {

            const existe = await conexionRedLote.findOne({ $text: { $search: Codigo } });
            if (existe) {
                if (req.req.method === "PUT" && req.req.body._id != existe._id) {
                    throw new Error(`Ya existe ese codigo en la base de datos!!! `);
                } else if (req.req.method === "POST") {
                    throw new Error(`Ya existe ese codigo en la base de datos!!! `);
                }
            }
        }
    },
};

export default helpersConexionRedLote;