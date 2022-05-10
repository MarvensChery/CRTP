const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

<<<<<<< HEAD
// Requete pour avoir les armes.
function getArmesAll() {
    return knex('IBAF');
=======
async function getIBAFById(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .select(
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'NoEvenement',
        );
}

async function getIBAFByNoSerie(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .select(
            'IdIBAF',
            'NoSerie',
            'Marque',
            'Calibre',
            'TypeArme',
            'NoEvenement',
        );
}

async function getCountIBAFById(id) {
    return knex('IBAF')
        .where('IdIBAF', id)
        .count('* as nbrLigne');
}
async function getCountIBAF(noSerie) {
    return knex('IBAF')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}

async function ajoutIBAF(noSerie, marque, calibre, typeArme, noEvenement) {
    let success = false;
    const count = await getCountIBAF(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBAF')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBAF(id, noSerie, marque, calibre, typeArme, noEvenement) {
    let success = false;
    const count = await getCountIBAFById(id);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .update(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Calibre: calibre,
                    TypeArme: typeArme,
                    NoEvenement: noEvenement,
                },
            )
            .where('IdIBAF', id);
        success = true;
    }
    return success;
}

async function suppresionIBAFById(idArme) {
    let success = false;
    const count = await getCountIBAFById(idArme);
    if (count[0].nbrLigne !== 0) {
        await knex('IBAF')
            .where('IdIBAF', idArme)
            .del();
        success = true;
    }
    return success;
>>>>>>> dev
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
<<<<<<< HEAD
    getArmesAll,
    postArme,
    updateArme,
    deleteData,
    getDataById,
    getDataByNoEvenement,
=======
    getIBAFByNoSerie,
    getIBAFById,
    ajoutIBAF,
    modificationIBAF,
    suppresionIBAFById,
>>>>>>> dev
};
