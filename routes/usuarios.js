//paquetes//
const {Router} = require('express');
const { check, query, body } = require('express-validator');


// controladores y helpers//
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios');
const { esRoleValido,existeEmail, existeUsuarioPorId, estadoUsuario } = require('../helpers/db-validators');

// middlewares//
const {validarCampos,validarJWT,validarRol,tieneRol} = require('../middlewares');
// const { validarCampos } = require('../middlewares/Validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { validarRol, tieneRol} = require('../middlewares/Validar-roles');

//rutas//
const router = Router();

//en la segunda posicion se pueden definir los middlewares si asi se desea y si manda varios se manda como un arreglo.
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



router.post('/',[
    validarJWT,

    tieneRol('ADMIN_ROLE'),

    //el check crea todos los errores en la request no los tira de una vez.
    body('nombre','El nombre es obligatorio').not().isEmpty(),

    body('correo','El correo no es valido').isEmail(),

    body('correo').custom(existeEmail),

    body('password','El password es obligatorio y debe de ser mas de 6 caracteres').isLength({min: 6}),

    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
   body('rol').custom(esRoleValido),

    validarCampos

], usuariosPost);


router.put('/:id',[
    validarJWT,

    tieneRol('ADMIN_ROLE'),

    check('id', 'No es un ID valido').isMongoId(),

    check('id').custom(existeUsuarioPorId).custom(estadoUsuario),

    body('rol').optional().custom(esRoleValido),

    validarCampos

], usuariosPut);


router.patch('/', usuariosPatch);


router.delete('/:id',[
    validarJWT,

    // validarRol,
    tieneRol('ADMIN_ROLE'),

    check('id', 'No es un ID valido').isMongoId(),

    check('id').custom(existeUsuarioPorId).custom(estadoUsuario),

    validarCampos

], usuariosDelete);
  



module.exports = router;