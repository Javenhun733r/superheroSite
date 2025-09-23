const { SuperheroInputDto } = require('../dto/superheroInput.dto');

function toSuperheroInputDto(body) {
    const dto = new SuperheroInputDto();
    dto.nickname = body.nickname?.trim();
    dto.realName = body.realName?.trim();
    dto.originDescription = body.originDescription?.trim();
    dto.superpowers = Array.isArray(body.superpowers)
        ? body.superpowers.map(p => p.trim())
        : body.superpowers?.split(',').map(p => p.trim()) || [];
    dto.catchPhrase = body.catchPhrase?.trim();
    dto.imageUrls = body.imageUrls || [];
    return dto;
}
module.exports = {
    toSuperheroInputDto
}