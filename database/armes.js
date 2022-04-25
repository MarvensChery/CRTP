const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour avoir les armes.
function getArmesAll() {
    return knex('IBAF');
}

// Insert notre donnee dans la database.
async function postArme(data) {
    return knex('IBAF')
        .insert(data);
}

// Update et retourne les donees qui ont le meme ID.
async function updateArme(data, id) {
    return knex('IBAF')
        .update(data)
        .where('IdIBAF', id);
}

// Delete les donnees qui ont le meme ID.
async function deleteData(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .del();
}

// Return les donnees avec le meme ID.
function getDataById(id) {
    return knex('IBAF')
        .where('IdIBAF', id);
}

// Return les donnees avec le meme NoEvenement.
function getDataByNoEvenement(id) {
    return knex('IBAF')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getArmesAll,
    postArme,
    updateArme,
    deleteData,
    getDataById,
    getDataByNoEvenement,
};
