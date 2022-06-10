const {response,request} = require('express');
const { Usuario,Categoria,Producto } = require('../models');
const {ObjectId} = require('mongoose').Types;

const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino = '', res = response)=>{

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            //si el usuario existe regresa el arreglo con el usuario si no existe regresa un arreglo vacio.
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {correo:regex}],
        $and: [{estado: true}]
    });

    res.json({
        results: usuarios
    })


}

const buscarCategorias = async(termino = '',res = response)=>{
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const categorias = await Categoria.find({nombre:regex,estado:true});

    res.json({
        results: categorias
    })

}
const buscarProductos = async(termino = '',res = response)=>{
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const productos = await Producto.find({nombre:regex,estado:true});

    res.json({
        results: productos
    })

}

const buscar = async(req = request, res = response)=>{

    const {coleccion, termino} =  req.params;

    if(!coleccionesPermitidas.includes(coleccion)){

        return res.status(400).json({
            msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }



    switch(coleccion){

        case 'categorias':
            buscarCategorias(termino,res);
        break;
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        case 'roles':
        break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
    }

}





module.exports = {
    buscar
}