/*
path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, login, renewToke } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Crear nuevos usuarios
router.post('/new',
  [//middlewares
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario
)

//Login
router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos,
  ],
  login
)

//Reevalidar token
router.get('/renew',  validarJWT, renewToke )

module.exports = router;

