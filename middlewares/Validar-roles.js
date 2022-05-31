const {response,request} = require('express');

//funcion para validar administrador//
const validarRol = (req, res = response , next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el role sin validar el token"
        })
    }

    const {rol,nombre} =  req.usuario;
    if(rol !== "ADMIN_ROLE"){
        return res.status(403).json({
            msg: `${nombre} No es administrador`
        })
    }
    next();

}
//funcion para validar cualquier rol requerido//
const tieneRol = (...roles) =>{

    return  (req, res, next)=>{
        
        if(!req.usuario){
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token"
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        next();
    }

}




module.exports = {
    validarRol,
    tieneRol
}