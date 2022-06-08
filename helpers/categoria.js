const {Categoria} = require("../models");

//validadores de categorias
const existeCategoria = async (id)=>{
    const existe = await Categoria.findById(id);
    if(!existe){
        throw new Error(`El id no existe ${id}`);
    }
}
const estadoCategoria = async (id)=>{
    const estadoCategoria = await Categoria.findById(id);

    if(!estadoCategoria.estado){
        throw new Error(`La categoria ya no existe`);
    }
}

const existeNombreCategoria = async(nombre)=>{

    const existeNombre = await Categoria.findOne({nombre});
    if(existeNombre){
        throw new Error('Ese nombre de categoria ya esta registrado en la DB')
    }

}



module.exports = {
 existeCategoria,
 estadoCategoria,
 existeNombreCategoria
}