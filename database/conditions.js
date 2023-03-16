const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test

// Requete knex qui retourne les informations de la condition
function returnCondition(idcondition) {
    return knex('Conditions')
        .where('IdCondition', idcondition);
}

// Requete knex qui retourne les conditions d'un evenement
function returnConditionsOfEvenement(IdIPPE) {
    return knex('Conditions')
        .where('IdIPPE', IdIPPE);
}

function modifierCondition(data, idCondition) {
    return knex('Conditions')
        .update(data)
        .where('IdCondition', idCondition);
}

// Requete knex qui insert la nouvelle condition
function ajouterCondition(nouvelleCondition) {
    return knex('Conditions')
        .insert(nouvelleCondition);
}

// Requete knex qui delete une conditions
function deleteCondition(IdCondition) {
    return knex('Conditions')
        .where({ IdCondition })
        .del();
}

module.exports = {
    returnCondition,
    modifierCondition,
    returnConditionsOfEvenement,
    ajouterCondition,
    deleteCondition,
};
