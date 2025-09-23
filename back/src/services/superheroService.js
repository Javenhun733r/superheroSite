const repository = require('../repo/superhero.repository');
const { SuperheroInputDto } = require('../dto/superheroInput.dto');

async function getAllSuperheroes(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
    const [heroes, total] = await Promise.all([
        repository.findAll(offset, limit),
        repository.countAll()
    ]);
    return { data: heroes, total }; // heroes вже у форматі Output DTO
}

async function createSuperhero(inputData) {
    if (!(inputData instanceof SuperheroInputDto)) {
        throw new Error('Data must be SuperheroInputDto');
    }
    return repository.create(inputData);
}

async function getSuperheroById(id) {
    return repository.findById(id);
}

async function updateSuperhero(id, inputData) {
    if (!(inputData instanceof SuperheroInputDto)) {
        throw new Error('Data must be SuperheroInputDto');
    }
    return repository.update(id, inputData);
}

async function deleteSuperhero(id) {
    return repository.deleteById(id);
}

module.exports = {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
};
