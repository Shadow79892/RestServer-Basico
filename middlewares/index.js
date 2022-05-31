const  validarCampos  = require('../middlewares/Validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  validarRoles = require('../middlewares/Validar-roles');






module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}

