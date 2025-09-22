const superheroService = require('../services/superheroService');

const getAllSuperheroes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const result = await superheroService.getAllSuperheroes(page, limit);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch superheroes' });
    }
};

const createSuperhero = async (req, res) => {
    try {
        const hero = await superheroService.createSuperhero(req.body);
        res.status(201).json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create superhero' });
    }
};

const getSuperheroById = async (req, res) => {
    try {
        const hero = await superheroService.getSuperheroById(req.params.id);
        if (!hero) return res.status(404).json({ error: 'Superhero not found' });
        res.json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get superhero' });
    }
};

const updateSuperhero = async (req, res) => {
    try {
        const hero = await superheroService.updateSuperhero(req.params.id, req.body);
        if (!hero) return res.status(404).json({ error: 'Superhero not found' });
        res.json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update superhero' });
    }
};

const deleteSuperhero = async (req, res) => {
    try {
        await superheroService.deleteSuperhero(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete superhero' });
    }
};

module.exports = {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
};
