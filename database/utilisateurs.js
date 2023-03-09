const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse, studentOrProf) {
    return knex('Utilisateurs')
        .where({
            Identifiant: identifiant,
            MotDePasse: motDePasse,
            Etudiant: studentOrProf,
        });
}

module.exports = {
    getUtilisateursAll,
    connexion,
};
