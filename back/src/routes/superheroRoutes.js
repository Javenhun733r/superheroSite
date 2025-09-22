const express = require('express');
const router = express.Router();

const {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
} = require('../controllers/superheroController');
const validateSuperhero = require('../../middlewares/validateSuperhero');
router.get('/', getAllSuperheroes);
router.get('/:id', getSuperheroById);
router.post('/',validateSuperhero, createSuperhero);
router.put('/:id',validateSuperhero, updateSuperhero);
router.delete('/:id', deleteSuperhero);

module.exports = router;
