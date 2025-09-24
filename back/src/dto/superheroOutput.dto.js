class SuperheroOutputDto {
    /** @type {string} */
    id;

    /** @type {string} */
    nickname;

    /** @type {string} */
    realName;

    /** @type {string} */
    originDescription;

    /** @type {string[]} */
    superpowers;

    /** @type {string} */
    catchPhrase;

    /** @type {{id: string, url: string}[]} */
    images;
}

export {
    SuperheroOutputDto
};
