const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
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
    getUtilisateurById,
    connexion,
};
