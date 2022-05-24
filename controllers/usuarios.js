const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = (req = response, res = request) => {

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

    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      return res.status(400).json({
        msg: "El correo ya existe"
      })
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //para grabar el registro en la base de datos
    await usuario.save();

    res.json({
        usuario
    });
  }

  const usuariosPut = (req, res) => {

    const id = req.params.id;


    res.json({
        msg: 'put api - controlador',
        id
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