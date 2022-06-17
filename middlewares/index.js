const  validarCampos  = require('../middlewares/Validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validarRoles = require('../middlewares/Validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');





module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles,
    ...validarArchivo
}

