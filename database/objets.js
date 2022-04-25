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
        .insert(data);
}

// Update les donnees avec le meme Dd.
async function updateObjet(data, id) {
    return knex('IBOB')
        .update(data)
        .where('IdBOB', id);
}

// Delete les donnees avec le meme Id.
async function deleteData(id) {
    return knex('IBOB')
        .where('IdBOB', id)
        .del();
}

// Return les donnees avec le meme Id.
function getDataById(id) {
    return knex('IBOB')
        .where('IdBOB', id);
}

// Return les donnees avec le meme NoEvenement.
function getDataByNoEvenement(id) {
    return knex('IBOB')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getObjetsAll,
    postObjet,
    updateObjet,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
