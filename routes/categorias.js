const {Router} = require('express');
const { body,query,check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoriaId, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { validarJWT,validarCampos,tieneRol} = require('../middlewares');
const {existeCategoria, estadoCategoria, existeNombreCategoria} =  require('../helpers/categoria');


const router = Router();

//obtener todas las categorias - public
router.get('/',
obtenerCategorias);


//obtener una categoria por id -publico
router.get('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria).custom(estadoCategoria),
    validarCampos
],obtenerCategoriaId);


//crear categoria -privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


//actualizar - privado - cualquiera con token valido.
router.put('/:id',[
    validarJWT,
    check('id', 'No es un ID valid').isMongoId(),
    check('id').custom(existeCategoria).custom(estadoCategoria),
    body('nombre', 'El nombre es obligatorio').not().isEmpty().custom(existeNombreCategoria),
    validarCampos
],actualizarCategoria);


//borrar una categoria -admin
router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria).custom(estadoCategoria),
    validarCampos
],borrarCategoria);






module.exports = router;