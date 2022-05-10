const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

<<<<<<< HEAD
// Requete pour get les objets.
function getObjetsAll() {
    return knex('IBOB');
=======
async function getIBOBbyId(Id) {
    return knex('IBOB')
        .where('IdBOB', Id)
        .select(
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'NoEvenement',
        );
}

async function getIBOBbyNoSerie(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .select(
            'IdBOB',
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'NoEvenement',
        );
}

async function getCountIBOBById(id) {
    return knex('IBOB')
        .where('IdBOB', id)
        .count('* as nbrLigne');
}

async function getCountIBOB(noSerie) {
    return knex('IBOB')
        .where('NoSerie', noSerie)
        .count('* as nbrLigne');
}

async function ajoutIBOB(noSerie, marque, modele, typeObjet, noEvenement) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne === 0) {
        await knex('IBOB')
            .insert(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBOB(id, noSerie, marque, modele, typeObjet, noEvenement) {
    let success = false;
    const count = await getCountIBOBById(id);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .update(
                {
                    NoSerie: noSerie,
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    NoEvenement: noEvenement,
                },
            )
            .where('IdBOB', id);
        success = true;
    }
    return success;
}

async function suppresionIBOById(idObjet) {
    let success = false;
    const count = await getCountIBOBById(idObjet);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .where('IdBOB', idObjet)
            .del();
        success = true;
    }
    return success;
>>>>>>> dev
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
<<<<<<< HEAD
    getObjetsAll,
    postObjet,
    updateObjet,
    deleteData,
    getDataById,
    getDataByNoEvenement,
=======
    getIBOBbyId,
    getCountIBOB,
    getCountIBOBById,
    ajoutIBOB,
    modificationIBOB,
    suppresionIBOById,
    getIBOBbyNoSerie,
>>>>>>> dev
};
