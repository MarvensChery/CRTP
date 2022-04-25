const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getValeursAll() {
    return knex('IBVA');
}

// ajoute la donnee a la base
async function postValeur(data) {
    return knex('IBVA')
        .insert(data);
}

// update la donnee avec le mm id
async function updateValeur(data, id) {
    return knex('IBVA')
        .update(data)
        .where('IdIBVA', id);
}

// delete la donnee avec le mm id
async function deleteData(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .del();
}

// retourne les donnees avec le mm id
function getDataById(id) {
    return knex('IBVA')
        .where('IdIBVA', id);
}

// retourne les donnees avec le mm NoEvenement
function getDataByNoEvenement(id) {
    return knex('IBVA')
        .where('NoEvenement', id);
}

module.exports = {
    getValeursAll,
    postValeur,
    updateValeur,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
