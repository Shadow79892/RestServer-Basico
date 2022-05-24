const {Router} = require('express');
const { check } = require('express-validator');
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios');
const { esRoleValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/Validar-campos');

const router = Router();

router.get('/', usuariosGet);
//en la segunda posicion se pueden definir los middlewares si asi se desea y si manda varios se manda como un arreglo.
router.post('/',[
    //el check crea todos los errores en la request no los tira de una vez.
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('password','El password es obligatorio y debe de ser mas de 6 caracteres').isLength({min: 6}),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);
  



module.exports = router;