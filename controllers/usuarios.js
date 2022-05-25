const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');




const usuariosGet = async (req, res) => {

  const {limite = 0 ,desde = 0} = req.query;
   const query = {estado:true};
  //esto es una desesctructuracion de arreglos para asignarle nombres a las posiciones.
  //y ejecutar dos await de forma que no se tenga que esperar a que termine uno para que el otro inicie y sea mas optimo.
    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(desde)
      .limit(limite)
    ]);
    res.json({
      total,
      usuarios
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
    const {_id,password,google,correo, ...resto} =  req.body;
     
    //todo validar contra base de datos
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id , resto);

    res.json(usuario);
  }

  const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch api - controlador'
    });
  }

  const usuariosDelete = async (req, res) => {
    const {id} = req.params;

    //borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete(id);
    //esto es una forma de borrarlo pero que se mantenga en tu base de datos para mantener la integridad de la misma
    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false});
    res.json(usuario);
  }





  module.exports = {
      usuariosGet,
      usuariosPost,
      usuariosPut,
      usuariosPatch,
      usuariosDelete
  }