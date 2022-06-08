const {Router} = require('express');
const { body,query,check } = require('express-validator');
const { crearProducto, obtenerProducto, obtenerProductos, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, estadoCategoria } = require('../helpers/categoria');
const { existeProductoPorId, estadoProducto, existeNombreProducto } = require('../helpers/db-validators');

const {validarCampos,validarJWT,tieneRol} = require('../middlewares');



const router = Router();



router.get('/',obtenerProducto);

router.get('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('id').custom(estadoProducto),
    validarCampos
],obtenerProductos);


router.post('/',[
    validarJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('precio', 'El precio es obligatorio').not().isEmpty(),
    body('categoria', 'No es un id valido').isMongoId(),
    body('categoria').custom(existeCategoria),
    body('categoria').custom(estadoCategoria),
    body('descripcion').optional(),
    validarCampos
],crearProducto);


router.put('/:id',[
    validarJWT,
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('id').custom(estadoProducto),
    body('nombre').optional().custom(existeNombreProducto),
    body('precio','El valor debe ser numerico').optional().isNumeric(),
    body('categoria').optional().custom(existeCategoria),
    body('categoria').optional().custom(estadoCategoria),
    body('descripcion').optional(),
    body('disponible','El valor debe ser true/false').optional().isBoolean(),
    validarCampos
],actualizarProducto);


router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    check('id').custom(estadoProducto),
    validarCampos
],borrarProducto);
















module.exports = router;