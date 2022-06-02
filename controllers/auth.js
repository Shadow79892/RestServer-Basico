const { response } = require("express");
const bcryptjs =  require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} =  require('../helpers/generarjwt');
const {googleVerify} = require('../helpers/google-verify')


const login = async (req, res = response)=>{

    const {correo,password} = req.body;

    try{

        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: "Usuario / Password no son validos - correo"
            })
        }

        //verificar el estado del usuario
        if(!usuario.estado){
            return res.status(400).json({
                msg: "El usuario ya no existe -Estado: false"
            })
        }
        //verificar contraseña
        const validPassword =  bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario / Password no son validos -Password"
            })
        }

        //genera el JWT
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        })
    }


}


const googleSignIn = async(req, res)=>{
    const {id_token} = req.body;

    try{
       const {nombre,img,correo} = await googleVerify(id_token);
       
       let usuario = await Usuario.findOne({correo});
       if(!usuario){
           const data = {
               nombre,
               correo,
               password: '123456',
               img,
               google: true,
               rol: 'USER_ROLE'
           };

           usuario =  new Usuario(data);
           await usuario.save();
       }
       //si el usuario tiene el estado en false en la db
       if(!usuario.estado){
           return res.status(401).json({
               msg: 'Hable con el administrador, usuario bloqueado'
           });
       }
       //genera el jwt
       const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar"
        })
    }
    
}


module.exports = {
    login,
    googleSignIn
}