/*
    Event Routes
    /api/pokemon
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPokemon, crearPokemon, actualizarPokemon, eliminarPokemon } = require('../controllers/pokemon');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener pokemon 
router.get('/', getPokemon );

// Crear un nuevo pokemon
router.post(
    '/',
    [
        check('id','El id es obligatorio').not().isEmpty(),
        check('name','El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearPokemon 
);

// Actualizar Pokemon
router.put(
    '/:id', 
    [
        check('id','El id es obligatorio').not().isEmpty(),
        check('name','El id es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarPokemon 
);

// Borrar pokemon
router.delete('/:id', eliminarPokemon );

module.exports = router;