const express = require('express');
const router = express.Router();
const { uploadMultiple } = require('../middlewares/uploadMiddleware');
const superheroController = require('../controllers/superheroController');
const checkUuid = require("../middlewares/uuidChecker");
const validateHero = require("../middlewares/validateSuperhero")
router.get('/', superheroController.getAllSuperheroes);
router.get('/:id', checkUuid, superheroController.getSuperheroById);
router.post('/', uploadMultiple('images', 5),validateHero, superheroController.createSuperhero);
router.put('/:id', checkUuid,  uploadMultiple('images', 5), superheroController.updateSuperhero);
router.delete('/:id', checkUuid,  superheroController.deleteSuperhero);

module.exports = router;
