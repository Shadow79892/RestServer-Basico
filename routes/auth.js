const {Router} = require('express');
const { body } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/Validar-campos');


const router = Router();

router.post('/login',[
    body('correo','El correo es obligatorio').isEmail(),
    body('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    body('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)

module.exports = router;