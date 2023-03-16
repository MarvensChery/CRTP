const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

function getUtilisateurs(IdUtilisateur) {
    return knex('Utilisateurs')
        .where('Utilisateurs.IdUtilisateur', IdUtilisateur)
        .select('*');
}

// Inscription de un utilisateur
function insertUtilisateurs(IdUtilisateur, Identifiant, MotDePasse, Etudiant, NomFamille) {
    return knex('Utilisateurs')
        .insert({
            IdUtilisateur,
            Identifiant,
            MotDePasse,
            Etudiant,
            NomFamille,

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
    console.log(rep);
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
    getUtilisateurs,
    insertUtilisateurs,
    updateUtilisateurs,
    deleteUtilisateurs,
    getUtilisateurById,
    connexion,
};
