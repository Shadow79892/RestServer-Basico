const {Router} = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/Validar-campos');


const router = Router();

router.post('/login',[
    body('correo','El correo es obligatorio').isEmail(),
    body('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],login)

module.exports = router;