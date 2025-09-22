function formatHero(hero) {
    return {
        id: hero.id,
        nickname: hero.nickname,
        realName: hero.realName,
        originDescription: hero.originDescription,
        superpowers: hero.superpowers,
        catchPhrase: hero.catchPhrase,
        images: hero.images?.map(img => ({
            id: img.id,
            url: img.url
        })) || []
    };
}

function formatHeroes(dataArray) {
    return dataArray.map(formatHero);
}

module.exports = {
    formatHero,
    formatHeroes
};