const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllSuperheroes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const [superheroes, total] = await Promise.all([
            prisma.superhero.findMany({
                skip: offset,
                take: limit,
                include: {
                    images: {
                        take: 1 // показує тільки одне зображення, як у ТЗ
                    }
                }
            }),
            prisma.superhero.count()
        ]);

        res.json({
            data: superheroes,
            total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch superheroes' });
    }
};

const createSuperhero = async (req, res) => {
    const {
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        imageUrls
    } = req.body;

    try {
        const newHero = await prisma.superhero.create({
            data: {
                nickname,
                realName,
                originDescription,
                superpowers,
                catchPhrase,
                images: {
                    create: imageUrls?.map((url) => ({ url })) || [],
                },
            },
            include: { images: true },
        });

        res.status(201).json(newHero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create superhero' });
    }
};
const getSuperheroById = async (req, res) => {
    const { id } = req.params;

    try {
        const hero = await prisma.superhero.findUnique({
            where: { id },
            include: { images: true },
        });

        if (!hero) {
            return res.status(404).json({ error: 'Superhero not found' });
        }

        res.json(hero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get superhero' });
    }
};
const updateSuperhero = async (req, res) => {
    const { id } = req.params;
    const {
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        imageUrls
    } = req.body;

    try {
        const existingHero = await prisma.superhero.findUnique({
            where: { id },
            include: { images: true }
        });

        if (!existingHero) {
            return res.status(404).json({ error: 'Superhero not found' });
        }

        await prisma.image.deleteMany({
            where: { superheroId: id }
        });

        const updatedHero = await prisma.superhero.update({
            where: { id },
            data: {
                nickname,
                realName,
                originDescription,
                superpowers,
                catchPhrase,
                images: {
                    create: imageUrls?.map((url) => ({ url })) || [],
                },
            },
            include: { images: true }
        });

        res.json(updatedHero);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update superhero' });
    }
};
const deleteSuperhero = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.image.deleteMany({
            where: { superheroId: id }
        });


        await prisma.superhero.delete({
            where: { id }
        });

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
