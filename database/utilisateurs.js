const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

function getUtilisateurByIdentifiant(Identifiant) {
    return knex('Utilisateurs')
        .where('Identifiant', Identifiant);
}

function insertUtilisateur(data) {
    return knex('Utilisateurs')
        .insert(data)
        .returning('IdUtilisateur')
        .then((IdUtilisateur) => console.log(`Id: ${IdUtilisateur[0]}`));
}

module.exports = {
    getUtilisateursAll,
    getUtilisateurByIdentifiant,
    insertUtilisateur,
};
