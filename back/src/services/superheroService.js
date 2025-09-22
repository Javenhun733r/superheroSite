const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { formatHero, formatHeroes } = require('../../dto/superhero.dto');

async function getAllSuperheroes(page = 1, limit = 5) {
    const offset = (page - 1) * limit;

    const [superheroes, total] = await Promise.all([
        prisma.superhero.findMany({
            skip: offset,
            take: limit,
            include: {
                images: { take: 1 }
            }
        }),
        prisma.superhero.count()
    ]);

    return { data: formatHeroes(superheroes), total };
}

async function createSuperhero(heroData) {
    const { imageUrls = [], ...rest } = heroData;

    const newHero = await prisma.superhero.create({
        data: {
            ...rest,
            images: {
                create: imageUrls.map((url) => ({ url }))
            }
        },
        include: { images: true }
    });

    return formatHero(newHero);
}

async function getSuperheroById(id) {
    const hero = await prisma.superhero.findUnique({
        where: { id },
        include: { images: true }
    });

    if (!hero) return null;

    return formatHero(hero);
}

async function updateSuperhero(id, updateData) {
    const { imageUrls = [], ...rest } = updateData;

    const existingHero = await prisma.superhero.findUnique({
        where: { id },
        include: { images: true }
    });

    if (!existingHero) return null;

    await prisma.image.deleteMany({
        where: { superheroId: id }
    });

    const updatedHero = await prisma.superhero.update({
        where: { id },
        data: {
            ...rest,
            images: {
                create: imageUrls.map((url) => ({ url }))
            }
        },
        include: { images: true }
    });

    return formatHero(updatedHero);
}

async function deleteSuperhero(id) {
    await prisma.image.deleteMany({ where: { superheroId: id } });
    await prisma.superhero.delete({ where: { id } });
}

module.exports = {
    getAllSuperheroes,
    createSuperhero,
    getSuperheroById,
    updateSuperhero,
    deleteSuperhero
};
