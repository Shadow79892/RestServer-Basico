const {response,request} = require('express');
const {Categoria} =  require('../models');



const obtenerCategorias = async (req = request, res = response)=>{

    const query = {estado: true};

    const [total,categorias] = await Promise.all([
        Categoria.countDocuments(query),
        //populate mongoose.
        Categoria.find(query).populate('usuario', 'nombre')
      ]);

      res.json({
          total,
          categorias
      })
}


const obtenerCategoriaId = async(req = request, res = response) =>{
    const {id} = req.params;


    const categoria = await Categoria.findById(id).populate('usuario','nombre');
    
      res.json(categoria);
}

//crear categoria.
const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB =  await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }
    
    //generar la data a guardar
    const data = {
          nombre,
          usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //guardar DB
    await categoria.save();

    res.status(201).json(categoria);

  }


  //actualizar categoria
  const actualizarCategoria = async(req, res)=>{
      const {id} = req.params;

      const {estado,usuario,...data} = req.body;
      data.nombre =  data.nombre.toUpperCase();
      data.usuario = req.usuario._id;

      const categoria = await Categoria.findByIdAndUpdate(id, data,{new: true});

      res.json(categoria);

  }



  //borrar categoria - estado: false
const borrarCategoria =  async(req,res)=>{
    const {id} =  req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});


    res.json(categoria);

}




  module.exports = {
      crearCategoria,
      obtenerCategorias,
      obtenerCategoriaId,
      actualizarCategoria,
      borrarCategoria
  }