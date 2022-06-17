const Role = require('../models/role');
const {response,request} = require('express');
const Usuario = require('../models/usuario');
const { Producto } = require('../models');


const esRoleValido = async(rol = '') =>{
     const existeRol = await Role.findOne({ rol });
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
        }
}

//para comprobar si el correo existe
const existeEmail = async(correo)=>{
    const emailExiste = await Usuario.findOne({correo});
    if(emailExiste){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async (id)=>{
    const existeId = await Usuario.findById(id);
    if(!existeId){
        throw new Error(`El id no existe ${id}`);
    }
}
const estadoUsuario = async (id)=>{
    const estadoUsuario = await Usuario.findById(id);

    if(!estadoUsuario.estado){
        throw new Error(`El usuario ya no existe`);
    }
}
const existeProductoPorId = async (id)=>{
    const existeId = await Producto.findById(id);
    if(!existeId){
        throw new Error(`El id no existe ${id}`);
    }
}
const estadoProducto = async (id)=>{
    const estadoProducto = await Producto.findById(id);

    if(!estadoProducto.estado){
        throw new Error(`El Producto ya no existe`);
    }
}
const existeNombreProducto = async(nombre)=>{

    const existeNombre = await Producto.findOne({nombre});
    if(existeNombre){
        throw new Error('Ese Producto ya esta registrado en la DB')
    }

}
//validar colecciones permitidas
const validarColecciones = (coleccion = '',colecciones = [])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    estadoUsuario,
    existeProductoPorId,
    estadoProducto,
    existeNombreProducto,
    validarColecciones
    
}