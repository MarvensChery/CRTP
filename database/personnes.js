const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Permet d'aller chercher une personne dans personne ainsi que son ippe pour l'afficher
function getPersonnes() {
    return knex('Personnes');
}

function getPersonneById(IdPersonne) {
    return knex('Personnes')
        .where('Personnes.IdPersonne', IdPersonne)
        .select('*');
}

async function InfoPersonneIppebyId(IdPersonne) {
    const data = await knex('Personnes').first()
        .where('IdPersonne', IdPersonne);

    const dataTosend = {
        data,
    };
    return dataTosend;
}

// Permet d'ajouter une personne à la base de donnée
function insertPersonne(TypePersonne, NomFamille, Prenom1, Prenom2, Masculin, DateNaissance) {
    return knex('Personnes')
        .insert({
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        }, ['IdPersonne'])
        .returning('IdPersonne');
}

// Info necessaire pour le tableau de la page personne
async function getIppePersonne(IdPersonne) {
    const resultat = await knex('IPPE')
        .select('IPPE.*')
        .where('PersonnesIPPE.IdPersonne', IdPersonne)
        .join('PersonnesIPPE', 'IPPE.IdIPPE', 'PersonnesIPPE.IdIPPE')
        .join('Personnes', 'PersonnesIPPE.IdPersonne', 'Personnes.IdPersonne');

    return resultat;
}

// Permet de modifer une personne et/ou sa description
async function updatePersonne(data, idPersonne) {
    await knex('Personnes')
        .where('IdPersonne', idPersonne)
        .update(data)
        .returning('*')
        .then((rows) => rows.length);
}

// Supprime une personne ainsi que son IPPE et ses Conditions
async function deletePersonne(IdPersonne) {
    const reponseIPPE = await knex('PersonnesIPPE')
        .where('IdPersonne', IdPersonne)
        .select('IdIPPE');
    reponseIPPE.forEach(async (element) => {
        await knex('PersonnesIPPE')
            .where('IdIPPE', element.IdIPPE)
            .del();
        await knex('Conditions')
            .where('IdIPPE', element.IdIPPE)
            .del();
        await knex('IPPE')
            .where('IdIPPE', element.IdIPPE)
            .del();
    });
    await knex('FPS')
        .where('IdPersonne', IdPersonne)
        .del();
    return knex('Personnes')
        .where('IdPersonne', IdPersonne)
        .del()
        .returning('*');
}

function getPersonnesAll() {
    return knex('Personnes');
}

module.exports = {
    updatePersonne,
    insertPersonne,
    getPersonneById,
    deletePersonne,
    getIppePersonne,
    getPersonnesAll,
    getPersonnes,
    InfoPersonneIppebyId,
};
