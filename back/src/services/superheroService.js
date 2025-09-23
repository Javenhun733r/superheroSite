const superheroRepository = require('../repo/superhero.repository');
const { SuperheroInputDto } = require('../dto/superheroInput.dto');

class SuperheroService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAllSuperheroes(page = 1, limit = 5) {
        const offset = (page - 1) * limit;
        const [heroes, total] = await Promise.all([
            this.repository.findAll(offset, limit),
            this.repository.countAll()
        ]);
        return { data: heroes, total };
    }

    async createSuperhero(inputData) {
        if (!(inputData instanceof SuperheroInputDto)) {
            throw new Error('Data must be SuperheroInputDto');
        }
        return this.repository.create(inputData);
    }

    async getSuperheroById(id) {
        return this.repository.findById(id);
    }

    async updateSuperhero(id, inputData) {
        if (!(inputData instanceof SuperheroInputDto)) {
            throw new Error('Data must be SuperheroInputDto');
        }
        return this.repository.update(id, inputData);
    }

    async deleteSuperhero(id) {
        return this.repository.deleteById(id);
    }
}
const superheroService = new SuperheroService(superheroRepository)
module.exports = superheroService;
