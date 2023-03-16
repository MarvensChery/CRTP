const knexModule = require('knex');
const bcrypt = require('bcryptjs');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .select('MotDePasse', 'Etudiant', 'Identifiant', 'NomFamille')
        .first();
}

async function hashAllPassword() {
    const utilisateurs = await knex('Utilisateurs')
        .select('Identifiant', 'MotDePasse');
    for (const utilisateur of utilisateurs) {
        const hash = await bcrypt.hash(utilisateur.MotDePasse, 10);
        await knex('Utilisateurs')
            .where('Identifiant', utilisateur.Identifiant)
            .update({ MotDePasse: hash });
    }
    console.log('hash effectue sur tous les mdp');
}
module.exports = {
    getUtilisateursAll,
    connexion,
    hashAllPassword,
};
