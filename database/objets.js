const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getObjetsAll() {
    return knex('IBOB');
}

// ajoute la donnee a la base
async function postObjet(data) {
    return knex('IBOB')
        .insert(data);
}

// update la donnee avec le mm id
async function updateObjet(data, id) {
    return knex('IBOB')
        .update(data)
        .where('IdBOB', id);
}

// delete la donnee avec le mm id
async function deleteData(id) {
    return knex('IBOB')
        .where('IdBOB', id)
        .del();
}

// retourne les donnees avec le mm id
function getDataById(id) {
    return knex('IBOB')
        .where('IdBOB', id);
}

// retourne les donnees avec le mm NoEvenement
function getDataByNoEvenement(id) {
    return knex('IBOB')
        .where('NoEvenement', id);
}

module.exports = {
    getObjetsAll,
    postObjet,
    updateObjet,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
