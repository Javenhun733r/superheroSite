import {toSuperheroInputDto} from '../mappers/superheroInput.mapper.js';
import S3Service from '../services/s3Service.js';

export default class SuperheroController {
    constructor(service) {
        this.service = service;
        this.s3Service = new S3Service();
    }

    getAllSuperheroes = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const result = await this.service.getAllSuperheroes(page, limit);
            res.json(result);
        } catch (err) {
            next(err);
        }
    }
    getSuperheroById = async (req, res, next) => {
        try {
            const hero = await this.service.getSuperheroById(req.params.id);
            res.json(hero);
        } catch (err) {
            next(err);
        }
    }

    createSuperhero = async (req, res, next) => {
        try {
            const heroDto = toSuperheroInputDto(req.body);

            heroDto.imageUrls = [];
            if (req.files && req.files.length) {
                for (const file of req.files) {
                    const url = await this.s3Service.upload(file);
                    heroDto.imageUrls.push(url);
                }
            }

            const hero = await this.service.createSuperhero(heroDto);
            res.status(201).json(hero);
        } catch (err) {
            next(err);
        }
    }

    updateSuperhero = async (req, res, next) => {
        try {
            const heroDto = toSuperheroInputDto(req.body);

            const oldImages = req.body.oldImages
                ? (Array.isArray(req.body.oldImages) ? req.body.oldImages : JSON.parse(req.body.oldImages))
                : [];

            const newImages = [];
            if (req.files && req.files.length) {
                for (const file of req.files) {
                    const url = await this.s3Service.upload(file);
                    newImages.push(url);
                }
            }

            heroDto.imageUrls = [...oldImages, ...newImages];

            const hero = await this.service.updateSuperhero(req.params.id, heroDto);
            res.json(hero);
        } catch (err) {
            next(err);
        }
    }

    deleteSuperhero = async (req, res, next) => {
        try {
            await this.service.deleteSuperhero(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
