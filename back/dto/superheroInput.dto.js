function mapCreateHeroDto(body) {
    return {
        nickname: body.nickname?.trim(),
        realName: body.realName?.trim(),
        originDescription: body.originDescription?.trim(),
        superpowers: Array.isArray(body.superpowers)
            ? body.superpowers.map(p => p.trim())
            : body.superpowers?.split(',').map(p => p.trim()) || [],
        catchPhrase: body.catchPhrase?.trim(),
        imageUrls: body.imageUrls || [],
    };
}

function mapUpdateHeroDto(body) {
    return mapCreateHeroDto(body);
}

module.exports = {
    mapCreateHeroDto,
    mapUpdateHeroDto,
};
