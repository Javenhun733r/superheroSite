const superheroService = require('../services/superheroService');
const {toSuperheroInputDto} = require('../mappers/superheroInput.mapper');

const getAllSuperheroes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await superheroService.getAllSuperheroes(page, limit);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to fetch superheroes'});
    }
};

const createSuperhero = async (req, res) => {
    try {
        const heroDto = toSuperheroInputDto(req.body);

        heroDto.imageUrls = req.files.map(file => `${process.env.BACKEND_ADDRESS}/uploads/${file.filename}`);
        const hero = await superheroService.createSuperhero(heroDto);
        res.status(201).json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to create superhero'});
    }
};


const getSuperheroById = async (req, res) => {
    try {
        const hero = await superheroService.getSuperheroById(req.params.id);
        if (!hero) return res.status(404).json({error: 'Superhero not found'});
        res.json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to get superhero'});
    }
};

const updateSuperhero = async (req, res) => {
    try {
        const heroDto = toSuperheroInputDto(req.body);

        const oldImages = (() => {
            const {oldImages} = req.body;
            if (!oldImages) return [];
            if (Array.isArray(oldImages)) return oldImages;
            try {
                return JSON.parse(oldImages);
            } catch {
                return [];
            }
        })();

        const newImages = (req.files || []).map(
            file => `${process.env.BACKEND_ADDRESS}/uploads/${file.filename}`
        );

        heroDto.imageUrls = [...oldImages, ...newImages];

        const hero = await superheroService.updateSuperhero(req.params.id, heroDto);
        if (!hero) {
            return res.status(404).json({error: 'Superhero not found'});
        }

        res.json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to update superhero'});
    }
};


const deleteSuperhero = async (req, res) => {
    try {
        await superheroService.deleteSuperhero(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Failed to delete superhero'});
    }
};

module.exports = {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
};
