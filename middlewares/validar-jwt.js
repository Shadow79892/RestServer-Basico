const { response,request} = require('express');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');




const validarJWT = async (req = request, res=response, next)=>{

    const token = req.header('X-token');


    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    };


    try{
        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido -usuario no existe en DB'
            })
        }

        //verificar si el usuario esta borrado no se pueda autenticar
        if(!usuario.estado){
            return res.status(401).json({
                msg: "Token no valido"
            })
        }

        //aqui se guarda el usuario autenticado
        req.usuario = usuario;

        next();

    }catch(error){

        console.log(error);

       return res.status(401).json({
            msg: "Token no valido"
        })
    }
}








module.exports = {
    validarJWT
}
