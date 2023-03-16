const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getCrimesAll() {
    return knex('Crimes');
}

// Retourne les donnees avec le meme id.
function getCrimeById(id) {
    return knex('Crimes')
        .where('', id);
}

module.exports = {
    getCrimesAll,
    getCrimeById,
};
