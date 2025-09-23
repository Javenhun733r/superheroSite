const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { toSuperheroOutputDto, toSuperheroOutputDtoArray } = require('../mappers/superheroOutput.mapper');

function findAll(offset, limit) {
    return prisma.superhero.findMany({
        skip: offset,
        take: limit,
        include: { images: true }
    })
        .then(toSuperheroOutputDtoArray)
        .catch(err => {
            console.error(err);
            throw new Error('Failed to fetch superheroes');
        });
}

function countAll() {
    return prisma.superhero.count()
        .catch(err => {
            console.error(err);
            throw new Error('Failed to count superheroes');
        });
}

function findById(id) {
    return prisma.superhero.findUnique({
        where: { id },
        include: { images: true }
    })
        .then(hero => {
            if (!hero) throw new Error(`Superhero not found with id: ${id}`);
            return toSuperheroOutputDto(hero);
        })
        .catch(err => {
            console.error(err);
            throw err;
        });
}

function create(data) {
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
            throw new Error('Failed to create superhero');
        });
}

function update(id, data) {
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
            throw new Error(`Failed to update superhero with id: ${id}`);
        });
}

function deleteById(id) {
    return prisma.image.deleteMany({ where: { superheroId: id } })
        .then(() => prisma.superhero.delete({ where: { id } }))
        .catch(err => {
            console.error(err);
            throw new Error(`Failed to delete superhero with id: ${id}`);
        });
}

module.exports = {
    findAll,
    countAll,
    findById,
    create,
    update,
    deleteById
};
