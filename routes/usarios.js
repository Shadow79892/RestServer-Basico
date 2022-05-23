const {Router} = require('express');
const { check } = require('express-validator');
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);
//en la segunda posicion se pueden definir los middlewares si asi se desea y si manda varios se manda como un arreglo.
router.post('/',[
    //el check crea todos los errores en la request no los tira de una vez.
    check('correo','El correo no es valido').isEmail(),

], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);
  



module.exports = router;