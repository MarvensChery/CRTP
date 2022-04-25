const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour get les valeurs.
function getValeursAll() {
    return knex('IBVA');
}

// Ajoute la donnee a la base.
async function postValeur(data) {
    return knex('IBVA')
        .insert(data);
}

// Update la donnee avec le meme id.
async function updateValeur(data, id) {
    return knex('IBVA')
        .update(data)
        .where('IdIBVA', id);
}

// Delete la donnee avec le meme id.
async function deleteData(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .del();
}

// Retourne les donnees avec le meme id.
function getDataById(id) {
    return knex('IBVA')
        .where('IdIBVA', id);
}

// Retourne les donnees avec le meme NoEvenement.
function getDataByNoEvenement(id) {
    return knex('IBVA')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getValeursAll,
    postValeur,
    updateValeur,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
