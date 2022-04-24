const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

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
            'NoSerie',
            'Marque',
            'Modele',
            'TypeObjet',
            'NoEvenement',
        );
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

async function modificationIBOB(noSerie, marque, modele, typeObjet, noEvenement) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .update(
                {
                    Marque: marque,
                    Modele: modele,
                    TypeObjet: typeObjet,
                    NoEvenement: noEvenement,
                },
            )
            .where('NoSerie', noSerie);
        success = true;
    }
    return success;
}

async function suppresionIBOByNoSerie(noSerie) {
    let success = false;
    const count = await getCountIBOB(noSerie);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .where('NoSerie', noSerie)
            .del();
        success = true;
    }
    return success;
}

async function suppresionIBOById(idObjet) {
    let success = false;
    const count = await getCountIBOB(idObjet);
    if (count[0].nbrLigne !== 0) {
        await knex('IBOB')
            .where('IdBOB', idObjet)
            .del();
        success = true;
    }
    return success;
}
module.exports = {
    getIBOBbyId,
    ajoutIBOB,
    modificationIBOB,
    suppresionIBOByNoSerie,
    suppresionIBOById,
    getIBOBbyNoSerie,
};
