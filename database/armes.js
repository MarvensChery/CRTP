/* eslint-disable linebreak-style */
const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getArmesAll() {
    return knex('IBAF');
}

// ajoute la donnee a la base
async function postArme(data) {
    return knex('IBAF')
        .insert(data);
}

// update la donnee avec le mm id
async function updateArme(data, id) {
    return knex('IBAF')
        .update(data)
        .where('IdIBAF', id);
}

// delete la donnee avec le mm id
async function deleteData(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .del();
}

// retourne les donnees avec le mm id
function getDataById(id) {
    return knex('IBAF')
        .where('IdIBAF', id);
}

// retourne les donnees avec le mm NoEvenement
function getDataByNoEvenement(id) {
    return knex('IBAF')
        .where('NoEvenement', id);
}

module.exports = {
    getArmesAll,
    postArme,
    updateArme,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
