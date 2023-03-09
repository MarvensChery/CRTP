const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getCrimesAll() {
    return knex('Crimes');
}

function getCrimesById(idCrime) {
    return knex('Crimes')
        .where('idCrime', idCrime);
}

module.exports = {
    getCrimesAll,
    getCrimesById,
};
