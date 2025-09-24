const superheroService = require('../services/superheroService');
const { toSuperheroInputDto } = require('../mappers/superheroInput.mapper');
const { uploadToS3 } = require('../services/s3Service');

class SuperheroController {
    constructor(service) {
        this.service = service;
    }

    getAllSuperheroes = async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await this.service.getAllSuperheroes(page, limit);
        res.json(result);
    }

    createSuperhero = async (req, res) => {
        const heroDto = toSuperheroInputDto(req.body);

        heroDto.imageUrls = [];
        if (req.files && req.files.length) {
            for (const file of req.files) {
                const url = await uploadToS3(file);
                heroDto.imageUrls.push(url);
            }
        }

        const hero = await this.service.createSuperhero(heroDto);
        res.status(201).json(hero);
    }

    getSuperheroById = async (req, res) => {
        const hero = await this.service.getSuperheroById(req.params.id);
        res.json(hero);
    }

    updateSuperhero = async (req, res) => {
        const heroDto = toSuperheroInputDto(req.body);

        const oldImages = req.body.oldImages
            ? (Array.isArray(req.body.oldImages) ? req.body.oldImages : JSON.parse(req.body.oldImages))
            : [];

        const newImages = [];
        if (req.files && req.files.length) {
            for (const file of req.files) {
                const url = await uploadToS3(file);
                newImages.push(url);
            }
        }

        heroDto.imageUrls = [...oldImages, ...newImages];
        const hero = await this.service.updateSuperhero(req.params.id, heroDto);
        res.json(hero);
    }

    deleteSuperhero = async (req, res) => {
        await this.service.deleteSuperhero(req.params.id);
        res.status(204).send();
    }
}

module.exports = new SuperheroController(superheroService);
