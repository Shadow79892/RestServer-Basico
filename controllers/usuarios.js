const {response,request} = require('express');


const usuariosGet = (req = response, res = request) => {

  const {q,nombre = "No name"} = req.query;


    res.json({
        msg: 'get api - controlador',
        q,
        nombre
    });
  }

  const usuariosPost = (req, res) => {

    const body = req.body;
    const {nombre,edad} = body;

    res.json({
        msg: 'Post api - controlador',
        nombre,
        edad
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