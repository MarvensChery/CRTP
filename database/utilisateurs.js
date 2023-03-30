const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

function insertUtilisateurs(Identifiant, MotDePasse, Etudiant, IdPersonne) {
    return knex('Utilisateurs')
        .insert({

            Identifiant,
            MotDePasse,
            Etudiant,
            IdPersonne,

        }, ['IdUtilisateur'])
        .returning('IdUtilisateur');
}

// Update et retourne les donees qui ont le meme ID.
async function updateUtilisateurs(data, id) {
    return knex('Utilisateurs')
        .update(data)
        .where('IdUtilisateur', id);
}

// Delete les donnees qui ont le meme ID.
async function deleteUtilisateurs(id) {
    return knex('Utilisateurs')
        .where('IdUtilisateur', id)
        .del();
}

function getUtilisateurById(id) {
    const rep = knex('Utilisateurs')
        .where('idUtilisateur', '=', id);
    return rep;
}

function getUtilisateurByIdentifiant(id) {
    const rep = knex('Utilisateurs')
        .where('Identifiant', '=', id);

    return rep;
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse, studentOrProf) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse)
        .andWhere('Etudiant', studentOrProf);
}

module.exports = {
    getUtilisateursAll,
    getUtilisateurByIdentifiant,
    insertUtilisateurs,
    updateUtilisateurs,
    deleteUtilisateurs,
    getUtilisateurById,
    connexion,
};
