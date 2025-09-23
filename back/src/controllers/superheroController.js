const superheroService = require('../services/superheroService');
const { toSuperheroInputDto } = require('../mappers/superheroInput.mapper');
const asyncHandler = require('../utils/asyncHandler');

class SuperheroController {
    constructor(service) {
        this.service = service;
        this.getAllSuperheroes = asyncHandler(this.getAllSuperheroes.bind(this));
        this.createSuperhero = asyncHandler(this.createSuperhero.bind(this));
        this.getSuperheroById = asyncHandler(this.getSuperheroById.bind(this));
        this.updateSuperhero = asyncHandler(this.updateSuperhero.bind(this));
        this.deleteSuperhero = asyncHandler(this.deleteSuperhero.bind(this));
    }

    async getAllSuperheroes(req, res) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await this.service.getAllSuperheroes(page, limit);
        res.json(result);
    }

    async createSuperhero(req, res) {
        const heroDto = toSuperheroInputDto(req.body);
        heroDto.imageUrls = (req.files || []).map(f => `${process.env.BACKEND_ADDRESS}/uploads/${f.filename}`);
        const hero = await this.service.createSuperhero(heroDto);
        res.status(201).json(hero);
    }

    async getSuperheroById(req, res) {
        const hero = await this.service.getSuperheroById(req.params.id);
        res.json(hero);
    }

    async updateSuperhero(req, res) {
        const heroDto = toSuperheroInputDto(req.body);
        const oldImages = req.body.oldImages
            ? (Array.isArray(req.body.oldImages) ? req.body.oldImages : JSON.parse(req.body.oldImages))
            : [];
        const newImages = (req.files || []).map(f => `${process.env.BACKEND_ADDRESS}/uploads/${f.filename}`);
        heroDto.imageUrls = [...oldImages, ...newImages];
        const hero = await this.service.updateSuperhero(req.params.id, heroDto);
        res.json(hero);
    }

    async deleteSuperhero(req, res) {
        await this.service.deleteSuperhero(req.params.id);
        res.status(204).send();
    }
}

module.exports = new SuperheroController(superheroService);
