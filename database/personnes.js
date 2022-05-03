const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour récupérer toutes les personnes
function getPersonnesAll() {
    return knex('Personnes');
}

// Requete pour récupérer une personne
function getPersonne(IdPersonne) {
    return knex('Personnes')
           .where({ IdPersonne });
}

module.exports = {
    getPersonnesAll,
    getPersonne,
};
