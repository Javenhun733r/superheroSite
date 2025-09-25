import {toSuperheroInputDto} from '../src/mappers/superheroInput.mapper.js';
import SuperheroService from '../src/services/superheroService.js';
import { jest } from '@jest/globals';
const mockRepository = {
    findAll: jest.fn(),
    countAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    deleteById: jest.fn(),
};

describe('SuperheroService', () => {
    let service;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new SuperheroService(mockRepository);
    });

    describe('getAllSuperheroes', () => {
        it('returns a list of superheroes and total count', async () => {
            mockRepository.findAll.mockResolvedValue([{ id: 1, name: 'Batman' }]);
            mockRepository.countAll.mockResolvedValue(1);

            const result = await service.getAllSuperheroes(1, 5);

            expect(result).toEqual({
                data: [{ id: 1, name: 'Batman' }],
                total: 1,
            });
            expect(mockRepository.findAll).toHaveBeenCalledWith(0, 5);
            expect(mockRepository.countAll).toHaveBeenCalled();
        });
    });

    describe('createSuperhero', () => {
        it('creates a superhero if DTO is provided', async () => {
            const dto = toSuperheroInputDto({
                nickname: 'Batman',
                realName: 'Bruce Wayne',
                originDescription: 'Rich guy in a bat suit',
                superpowers: ['Martial arts', 'Detective skills'],
                catchPhrase: "I'm Batman",
                imageUrls: ['http://batman.jpg']
            });

            mockRepository.create.mockResolvedValue({ id: 1, ...dto });

            const result = await service.createSuperhero(dto);

            expect(result).toEqual({ id: 1, ...dto });
            expect(mockRepository.create).toHaveBeenCalledWith(dto);
        });

        it('throws an error if data is not a DTO', async () => {
            await expect(service.createSuperhero({ name: 'Batman' }))
                .rejects.toThrow('Data must be SuperheroInputDto');
        });
    });

    describe('getSuperheroById', () => {
        it('returns a superhero by id', async () => {
            mockRepository.findById.mockResolvedValue({ id: 1, name: 'Superman' });

            const result = await service.getSuperheroById(1);

            expect(result).toEqual({ id: 1, name: 'Superman' });
            expect(mockRepository.findById).toHaveBeenCalledWith(1);
        });
    });

    describe('updateSuperhero', () => {
        it('updates a superhero if DTO is provided', async () => {
            const dto = toSuperheroInputDto({
                nickname: 'Ironman',
                realName: 'Tony Stark',
                originDescription: 'Genius billionaire playboy philanthropist',
                superpowers: ['Powered armor suit', 'Genius intellect'],
                catchPhrase: "I am Iron Man",
                imageUrls: ['http://ironman.jpg']
            });

            mockRepository.update.mockResolvedValue({ id: 1, ...dto });

            const result = await service.updateSuperhero(1, dto);

            expect(result).toEqual({ id: 1, ...dto });
            expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
        });

        it('throws an error if data is not a DTO', async () => {
            await expect(service.updateSuperhero(1, { name: 'Ironman' }))
                .rejects.toThrow('Data must be SuperheroInputDto');
        });
    });

    describe('deleteSuperhero', () => {
        it('deletes a superhero by id', async () => {
            mockRepository.deleteById.mockResolvedValue(true);

            const result = await service.deleteSuperhero(1);

            expect(result).toBe(true);
            expect(mockRepository.deleteById).toHaveBeenCalledWith(1);
        });
    });
});
