const prisma = require("../db/prisma");
const { toSuperheroOutputDto, toSuperheroOutputDtoArray } = require('../mappers/superheroOutput.mapper');
const { NotFoundError, AppError } = require('../errors/CustomErrors');
class SuperheroRepository {

    findAll(offset, limit) {
        return prisma.superhero.findMany({
            skip: offset,
            take: limit,
            include: { images: true }
        })
            .then(toSuperheroOutputDtoArray)
            .catch(err => {
                console.error(err);
                throw new AppError('Failed to fetch superheroes');
            });
    }

    countAll() {
        return prisma.superhero.count()
            .catch(err => {
                console.error(err);
                throw new AppError('Failed to count superheroes');
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
                console.error(err);
                throw err instanceof AppError ? err : new AppError('Failed to fetch superhero');
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
                console.error(err);
                throw new AppError('Failed to create superhero');
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
                console.error(err);
                throw new AppError(`Failed to update superhero with id: ${id}`);
            });
    }

    deleteById(id) {
        return prisma.image.deleteMany({ where: { superheroId: id } })
            .then(() => prisma.superhero.delete({ where: { id } }))
            .catch(err => {
                console.error(err);
                throw new AppError(`Failed to delete superhero with id: ${id}`);
            });
    }
}

module.exports = new SuperheroRepository ();
