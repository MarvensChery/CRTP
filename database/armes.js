const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour avoir les armes.
function getArmesAll() {
    return knex('IBAF');
}
function getArmeByNumSerie(numSerie) {
    return knex('IBAF')
        .where('NoSerie', numSerie);
}
function getArmeLast() {
    return knex('IBAF').orderBy('IdIBAF', 'desc').first();
}

// Insert notre donnee dans la database.
function insertArme(data) {
    return knex('IBAF')
        .insert(data).then(() => knex('IBAF').select('IdIBAF').orderBy('IdIBAF', 'desc').first());
}

// Update et retourne les donees qui ont le meme ID.
function updateArme(data, id) {
    return knex('IBAF')
        .update(data)
        .where('IdIBAF', id);
}

// Delete les donnees qui ont le meme ID.
function deleteArme(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .del();
}

// Return les donnees avec le meme ID.
function getArmeById(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .first();
}

// Exporte les fonctions.
module.exports = {
    getArmeByNumSerie,
    getArmesAll,
    getArmeLast,
    getArmeById,
    insertArme,
    updateArme,
    deleteArme,
};
