import prisma from '../db/prisma.js';
import { toSuperheroOutputDto, toSuperheroOutputDtoArray } from '../mappers/superheroOutput.mapper.js';
import { NotFoundError, AppError } from '../errors/CustomErrors.js';

class SuperheroRepository {
    findAll(offset, limit) {
        return prisma.superhero.findMany({
            skip: offset,
            take: limit,
            include: { images: true }
        })
            .then(toSuperheroOutputDtoArray)
            .catch(err => {
                throw new AppError('Failed to fetch superheroes', err);
            });
    }

    countAll() {
        return prisma.superhero.count()
            .catch(err => {
                throw new AppError('Failed to count superheroes', err);
            });
    }

    findById(id) {
        return prisma.superhero.findUnique({
            where: { id },
            include: { images: true }
        })
            .then(hero => {
                if (!hero) throw new NotFoundError(`Superhero not found with id: ${id}`);
                return toSuperheroOutputDto(hero);
            })
            .catch(err => {
                throw err instanceof AppError ? err : new AppError('Failed to fetch superhero', err);
            });
    }

    create(data) {
        const { imageUrls = [], ...rest } = data;

        return prisma.superhero.create({
            data: {
                ...rest,
                images: { create: imageUrls.map(url => ({ url })) }
            },
            include: { images: true }
        })
            .then(toSuperheroOutputDto)
            .catch(err => {
                throw new AppError('Failed to create superhero', err);
            });
    }

    update(id, data) {
        const { imageUrls = [], ...rest } = data;

        return prisma.image.deleteMany({ where: { superheroId: id } })
            .then(() => prisma.superhero.update({
                where: { id },
                data: {
                    ...rest,
                    images: { create: imageUrls.map(url => ({ url })) }
                },
                include: { images: true }
            }))
            .then(toSuperheroOutputDto)
            .catch(err => {
                throw new AppError(`Failed to update superhero with id: ${id}`, err);
            });
    }

    deleteById(id) {
        return prisma.image.deleteMany({ where: { superheroId: id } })
            .then(() => prisma.superhero.delete({ where: { id } }))
            .catch(err => {
                throw new AppError(`Failed to delete superhero with id: ${id}`, err);
            });
    }
}

export default SuperheroRepository;
