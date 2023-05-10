const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour get les objets.
function getObjetsAll() {
    return knex('IBOB');
}

// Ajoute les donnees dans la database.
async function postObjet(data) {
    return knex('IBOB')
        .insert(data).returning('*');
}

// Update les donnees avec le meme Dd.
async function updateObjet(data, id) {
    return knex('IBOB')
        .update(data)
        .where('IdIBOB', id);
}

// Delete les donnees avec le meme Id.
async function deleteObjet(id) {
    return knex('IBOB')
        .where('IdIBOB', id)
        .del();
}

// Return les donnees avec le meme Id.
function getObjetById(id) {
    return knex('IBOB')
        .where('IdIBOB', id);
}
function getObjetByNumSerie(numSerie) {
    return knex('IBOB')
        .where('NoSerie', numSerie);
}

// Return les donnees avec le meme NoEvenement.
function getObjetByNoEvenement(id) {
    return knex('IdIBOB')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getObjetByNumSerie,
    getObjetsAll,
    postObjet,
    updateObjet,
    deleteObjet,
    getObjetById,
    getObjetByNoEvenement,
};
