import {SuperheroInputDto} from '../dto/superheroInput.dto.js';

export default class SuperheroService {
    constructor(repository) {
        this.repository = repository;
    }

    getAllSuperheroes = async (page = 1, limit = 5) => {
        const offset = (page - 1) * limit;
        const [heroes, total] = await Promise.all([
            this.repository.findAll(offset, limit),
            this.repository.countAll()
        ]);
        return {data: heroes, total};
    }

    createSuperhero = async (inputData) => {
        if (!(inputData instanceof SuperheroInputDto)) {
            throw new Error('Data must be SuperheroInputDto');
        }
        return this.repository.create(inputData);
    }

    getSuperheroById = async (id) => {
        return this.repository.findById(id);
    }

    updateSuperhero = async (id, inputData) => {
        if (!(inputData instanceof SuperheroInputDto)) {
            throw new Error('Data must be SuperheroInputDto');
        }
        return this.repository.update(id, inputData);
    }

    deleteSuperhero = async (id) => {
        return this.repository.deleteById(id);
    }
}


