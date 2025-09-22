const express = require('express');
const router = express.Router();

const {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
} = require('../controllers/superheroController');

router.get('/', getAllSuperheroes);
router.get('/:id', getSuperheroById);
router.post('/', createSuperhero);
router.put('/:id', updateSuperhero);
router.delete('/:id', deleteSuperhero);

module.exports = router;
