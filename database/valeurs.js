const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour get les valeurs.
function getValeursAll() {
    return knex('IBVA');
}

// Ajoute une valeur dans la base de données.
async function postValeur(data) {
    return knex('IBVA')
        .insert(data, ['IdIBVA'])
        .returning('IdIBVA');
}

// Update la donnee avec le meme id.
async function updateValeur(data, idValeur) {
    return knex('IBVA')
        .update(data)
        .where('IdIBVA', idValeur)
        .returning('*')
        .then((rows) => rows.length);
}

// Delete la donnee avec le meme id.
async function deleteValeur(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .del()
        .returning('*')
        .then((rows) => rows.length);
}

// Retourne les donnees avec le meme id.
function getValeurById(id) {
    return knex('IBVA')
        .where('IdIBVA', id);
}

// Retourne les donnees avec le meme NoEvenement.
function getValeurByNoEvenement(id) {
    return knex('IBVA')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getValeursAll,
    postValeur,
    updateValeur,
    deleteValeur,
    getValeurById,
    getValeurByNoEvenement,
};
