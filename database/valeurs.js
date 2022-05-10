const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

<<<<<<< HEAD
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
=======
async function getIBVAbyId(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .select(
            'Identifiant',
            'Auteur',
            'TypeValeur',
            'TypeEvenement',
            'NoEvenement',
        );
}

async function getIBVAbyIdentifiant(identifiant) {
    return knex('IBVA')
        .where('Identifiant', identifiant)
        .select(
            'IdIBVA',
            'Identifiant',
            'Auteur',
            'TypeValeur',
            'TypeEvenement',
            'NoEvenement',
        );
}

async function getCountIBVAById(id) {
    return knex('IBVA')
        .where('IdIBVA', id)
        .count('* as nbrLigne');
}
async function getCountIBVA(identifiant) {
    return knex('IBVA')
        .where('Identifiant', identifiant)
        .count('* as nbrLigne');
}

async function ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement) {
    let success = false;
    const count = await getCountIBVA(identifiant);
    if (count[0].nbrLigne === 0) {
        await knex('IBVA')
            .insert(
                {
                    Identifiant: identifiant,
                    Auteur: auteur,
                    TypeValeur: typeValeur,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            );
        success = true;
    }
    return success;
}

async function modificationIBVA(id, identifiant, auteur, typeValeur, typeEvenement, noEvenement) {
    let success = false;
    const count = await getCountIBVAById(id);
    if (count[0].nbrLigne !== 0) {
        await knex('IBVA')
            .update(
                {
                    Identifiant: identifiant,
                    Auteur: auteur,
                    TypeValeur: typeValeur,
                    TypeEvenement: typeEvenement,
                    NoEvenement: noEvenement,
                },
            )
            .where('IdIBVA', id);
        success = true;
    }
    return success;
}

async function suppresionIBVAById(idValeur) {
    let success = false;
    const count = await getCountIBVAById(idValeur);
    if (count[0].nbrLigne !== 0) {
        await knex('IBVA')
            .where('IdIBVA', idValeur)
            .del();
        success = true;
    }
    return success;
}
module.exports = {
    getIBVAbyId,
    getIBVAbyIdentifiant,
    ajoutIBVA,
    modificationIBVA,
    suppresionIBVAById,
>>>>>>> dev
};
