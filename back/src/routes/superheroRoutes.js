import express from 'express';
import { uploadMultiple } from '../middlewares/uploadMiddleware.js';
import {superheroController} from '../controllers/index.js';
import checkUuid from '../middlewares/uuidChecker.js';
import validateHero from '../middlewares/validateSuperhero.js';

const router = express.Router();

router.get('/', superheroController.getAllSuperheroes);
router.get('/:id', checkUuid, superheroController.getSuperheroById);
router.post('/', uploadMultiple('images', 5), validateHero, superheroController.createSuperhero);
router.put('/:id', checkUuid, uploadMultiple('images', 5), validateHero, superheroController.updateSuperhero);
router.delete('/:id', checkUuid, superheroController.deleteSuperhero);

export default router;
