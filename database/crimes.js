const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getCrimesAll() {
    return knex('Crimes');
}

// Retourne les donnees avec le meme id.
function getCrimeById(IdCrime) {
    return knex('Crimes')
        .where('IdCrime', IdCrime);
}

module.exports = {
    getCrimesAll,
    getCrimeById,
};
