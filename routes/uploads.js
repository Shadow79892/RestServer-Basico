const {Router} = require('express');
const { body,check } = require('express-validator');
const { cargarArchivos, actualizarImagen,mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const {validarColecciones} = require('../helpers/db-validators');

const { validarCampos,validarArchivo} = require('../middlewares');


const router = Router();

router.get('/:coleccion/:id',[
check('id', 'El id debe ser de mongo').isMongoId(),
check('coleccion').custom(c => validarColecciones(c,['usuarios','productos'])),
validarCampos
],mostrarImagen);

router.post('/',validarArchivo,cargarArchivos);

router.put('/:coleccion/:id',[
validarArchivo,
check('id', 'El id debe ser de mongo').isMongoId(),
check('coleccion').custom(c => validarColecciones(c,['usuarios','productos'])),
validarCampos
],actualizarImagenCloudinary)

module.exports = router;