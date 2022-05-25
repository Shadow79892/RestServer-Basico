const {Router} = require('express');
const { check, query } = require('express-validator');
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios');
const { esRoleValido,existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/Validar-campos');

const router = Router();

router.get('/',[
    //validacion de si es un numero el limite y desde.
    query('limite','El valor del limite debe ser numerico')
    .isNumeric()
    .optional(),
    query('desde',"El valor de desde deber ser numerico")
    .isNumeric()
    .optional(),
    validarCampos
], usuariosGet);
//en la segunda posicion se pueden definir los middlewares si asi se desea y si manda varios se manda como un arreglo.
router.post('/',[
    //el check crea todos los errores en la request no los tira de una vez.
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('password','El password es obligatorio y debe de ser mas de 6 caracteres').isLength({min: 6}),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);
  



module.exports = router;