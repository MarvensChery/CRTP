const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, etudiantOuProf) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('Etudiant', etudiantOuProf);
}

module.exports = {
    getUtilisateursAll,
    connexion,
};
