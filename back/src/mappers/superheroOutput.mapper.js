import { SuperheroOutputDto } from '../dto/superheroOutput.dto.js';

function toSuperheroOutputDto(hero) {
    const dto = new SuperheroOutputDto();
    dto.id = hero.id;
    dto.nickname = hero.nickname;
    dto.realName = hero.realName;
    dto.originDescription = hero.originDescription;
    dto.superpowers = hero.superpowers;
    dto.catchPhrase = hero.catchPhrase;
    dto.images = hero.images?.map(img => ({
        id: img.id,
        url: img.url
    })) || [];
    return dto;
}

function toSuperheroOutputDtoArray(heroes) {
    return heroes.map(toSuperheroOutputDto);
}

export { toSuperheroOutputDto, toSuperheroOutputDtoArray };
