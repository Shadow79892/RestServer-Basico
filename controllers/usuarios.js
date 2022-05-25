const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = (req, res) => {

  const {q,nombre = "No name"} = req.query;


    res.json({
        msg: 'get api - controlador',
        q,
        nombre
    });
  }

  const usuariosPost = async (req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //para grabar el registro en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosPut = async (req, res) => {

    const {id} = req.params;
    const {password,google,correo, ...resto} =  req.body;
     
    //todo validar contra base de datos
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id , resto);

    res.json({
        usuario
    });
  }

  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch api - controlador'
    });
  }

  const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete api - controlador'
    });
  }





  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }