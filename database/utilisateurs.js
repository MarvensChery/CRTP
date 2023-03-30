const knexModule = require('knex');
const bcrypt = require('bcryptjs');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

async function getUtilisateurByIdentifiant(identifiant) {
      const utilisateur = await knex('utilisateurs')
        .where({ Identifiant: identifiant })
        .first();
      return utilisateur;
}

// Requete knex qui retourne les informations de connexion

function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

function inscription(identifiant, motDePasse, studentOrProf, nomFamille) {
    return knex('Utilisateurs')
        .insert({
            Identifiant: identifiant,
            MotDePasse: motDePasse,
            Etudiant: studentOrProf,
            NomFamille: nomFamille,
        });
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
    getUtilisateurByIdentifiant,
    connexion,
    hashAllPassword,
    inscription,
};
