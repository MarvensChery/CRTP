const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete pour avoir les armes.
function getArmesAll() {
    return knex('IBAF');
}

// Insert une arme dans la database.
async function postArme(NoSerie, Marque, Calibre, TypeArme, NoEvenement) {
    const data = {
        NoSerie,
        Marque,
        Calibre,
        TypeArme,
        NoEvenement,
    };
    return knex('IBAF')
        .insert(data);
}

// Update et retourne les armes qui ont le meme ID.
async function updateArme(data, id) {
    console.log(data, id);
    return knex('IBAF')
        .update(data)
        .where('IdIBAF', id);
}

// Delete les donnees qui ont le meme ID.
async function deleteArme(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .del();
}

// Return les donnees avec le meme ID.
function getArmeById(id) {
    return knex('IBAF')
        .where('IdIBAF', id);
}

// Return les donnees avec le meme NoEvenement.
function getArmeByNoEvenement(id) {
    return knex('IBAF')
        .where('NoEvenement', id);
}
// Exporte les fonctions.
module.exports = {
    getArmesAll,
    postArme,
    updateArme,
    deleteArme,
    getArmeById,
    getArmeByNoEvenement,
};
