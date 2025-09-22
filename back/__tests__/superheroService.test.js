const superheroService = require('/src/services/superheroService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

jest.mock('@prisma/client', () => {
    const mockPrisma = {
        superhero: {
            findMany: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        },
        image: {
            deleteMany: jest.fn()
        }
    };

    return { PrismaClient: jest.fn(() => mockPrisma) };
});

describe('Superhero Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return paginated superheroes', async () => {
        const mockHeroes = [{ id: '1', nickname: 'Iron Man', images: [] }];
        prisma.superhero.findMany.mockResolvedValue(mockHeroes);
        prisma.superhero.count.mockResolvedValue(1);

        const result = await superheroService.getAllSuperheroes(1, 5);

        expect(prisma.superhero.findMany).toHaveBeenCalled();
        expect(prisma.superhero.count).toHaveBeenCalled();
        expect(result).toHaveProperty('data');
        expect(result.total).toBe(1);
    });

    it('should create a new superhero', async () => {
        const input = {
            nickname: 'Spider-Man',
            realName: 'Peter Parker',
            originDescription: 'Bitten by a spider',
            superpowers: ['web', 'jump'],
            catchPhrase: 'With great power...',
            imageUrls: ['https://image.jpg']
        };

        prisma.superhero.create.mockResolvedValue({
            ...input,
            id: '123',
            images: [{ url: input.imageUrls[0] }]
        });

        const result = await superheroService.createSuperhero(input);

        expect(prisma.superhero.create).toHaveBeenCalled();
        expect(result).toHaveProperty('nickname', 'Spider-Man');
    });

    it('should return a hero by ID', async () => {
        const hero = {
            id: '1',
            nickname: 'Batman',
            images: []
        };

        prisma.superhero.findUnique.mockResolvedValue(hero);

        const result = await superheroService.getSuperheroById('1');

        expect(prisma.superhero.findUnique).toHaveBeenCalledWith({
            where: { id: '1' },
            include: { images: true }
        });

        expect(result.nickname).toBe('Batman');
    });

    it('should return null if hero not found', async () => {
        prisma.superhero.findUnique.mockResolvedValue(null);

        const result = await superheroService.getSuperheroById('not-found');

        expect(result).toBeNull();
    });

    it('should update superhero', async () => {
        const heroId = '123';
        const updateData = {
            nickname: 'Updated Hero',
            realName: 'Real Name',
            originDescription: 'Updated desc',
            superpowers: ['flying'],
            catchPhrase: 'boom',
            imageUrls: ['url1', 'url2']
        };

        prisma.superhero.findUnique.mockResolvedValue({ id: heroId });
        prisma.image.deleteMany.mockResolvedValue();
        prisma.superhero.update.mockResolvedValue({
            id: heroId,
            ...updateData,
            images: updateData.imageUrls.map(url => ({ url }))
        });

        const result = await superheroService.updateSuperhero(heroId, updateData);

        expect(result.nickname).toBe('Updated Hero');
        expect(prisma.superhero.update).toHaveBeenCalled();
    });

    it('should delete superhero', async () => {
        await superheroService.deleteSuperhero('delete-id');

        expect(prisma.image.deleteMany).toHaveBeenCalledWith({
            where: { superheroId: 'delete-id' }
        });

        expect(prisma.superhero.delete).toHaveBeenCalledWith({
            where: { id: 'delete-id' }
        });
    });
});
