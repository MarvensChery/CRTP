const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour get les valeurs.
function getValeursAll() {
    return knex('IBVA');
}

// Ajoute la donnee a la base.
async function insertValeur(data) {
    return knex('IBVA')
        .insert(data)
        .returning('IdIBVA')
        .then((IdIBVA) => console.log(`Id: ${IdIBVA[0]}`));
}

// Update la donnee avec le meme id.
async function updateValeur(data, id) {
    return knex('IBVA')
        .update(data)
        .where('IdIBVA', id)
        .returning('*')
        .then((Valeur) => console.log(`${Valeur.length} ligne modifiée`));
}

// Delete la donnee avec le meme id.
async function deleteValeur(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .del()
        .returning('*')
        .then((Valeur) => console.log(`${Valeur.length} ligne supprimée`));
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
    insertValeur,
    updateValeur,
    deleteValeur,
    getValeurById,
    getValeurByNoEvenement,
};
