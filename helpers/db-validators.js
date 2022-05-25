const Role = require('../models/role');
const {response,request} = require('express');
const Usuario = require('../models/usuario');


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


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId,
    
}