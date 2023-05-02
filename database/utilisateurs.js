const knexModule = require('knex');
const bcrypt = require('bcryptjs');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

function getUtilisateurByIdentifiant(Identifiant) {
    return knex('utilisateurs')
        .where('Identifiant', Identifiant)
        .first();
}

// Requete knex qui retourne les informations de connexion

function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

function insertUsers(identifiant, motDePasse,studentOrProf,nomFamille) {
    knex('Utilisateurs')
        .insert(
            {'Identifiant': identifiant,
            'MotDePasse':motDePasse,
            'Etudiant':studentOrProf,
            'NomFamille':nomFamille}
        )
};

function getPasswords(){
    knex
    .from('Utilisateurs')
    .select('Identifiant','MotDePasse')
};

function updatePassword(identifiant,password){
    knex('Utilisateurs')
        .where({'Identifiant': identifiant})
        .update({'MotDePasse': password})
};

module.exports = {
    getUtilisateursAll,
    getUtilisateurByIdentifiant,
    connexion,
    insertUsers,
    getPasswords,
    updatePassword,
};
