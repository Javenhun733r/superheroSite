const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middlewares/uploadMiddleware');
const {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
} = require('../controllers/superheroController');
const validateSuperhero = require('../middlewares/validateSuperhero');

router.get('/', getAllSuperheroes);
router.get('/:id', getSuperheroById);
router.post('/',uploadMultiple('images', 5),  createSuperhero);
router.put('/:id', uploadMultiple('images', 5),  updateSuperhero);
router.delete('/:id', deleteSuperhero);

module.exports = router;
