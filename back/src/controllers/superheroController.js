const superheroService = require('../services/superheroService');
const { toSuperheroInputDto } = require('../mappers/superheroInput.mapper');


class SuperheroController {
    constructor(service) {
        this.service = service;

    }

   getAllSuperheroes =  async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await this.service.getAllSuperheroes(page, limit);
        res.json(result);
    }

   createSuperhero =  async (req, res) =>  {
        const heroDto = toSuperheroInputDto(req.body);
        heroDto.imageUrls = (req.files || []).map(f => `${process.env.BACKEND_ADDRESS}/uploads/${f.filename}`);
        const hero = await this.service.createSuperhero(heroDto);
        res.status(201).json(hero);
    }

     getSuperheroById =  async (req, res) =>  {
        const hero = await this.service.getSuperheroById(req.params.id);
        res.json(hero);
    }

     updateSuperhero =  async (req, res) =>  {
        const heroDto = toSuperheroInputDto(req.body);
        const oldImages = req.body.oldImages
            ? (Array.isArray(req.body.oldImages) ? req.body.oldImages : JSON.parse(req.body.oldImages))
            : [];
        const newImages = (req.files || []).map(f => `${process.env.BACKEND_ADDRESS}/uploads/${f.filename}`);
        heroDto.imageUrls = [...oldImages, ...newImages];
        const hero = await this.service.updateSuperhero(req.params.id, heroDto);
        res.json(hero);
    }

    deleteSuperhero =  async (req, res) =>  {
        await this.service.deleteSuperhero(req.params.id);
        res.status(204).send();
    }
}

module.exports = new SuperheroController(superheroService);
