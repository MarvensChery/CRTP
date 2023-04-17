const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test

// Requete knex qui retourne les informations de la condition
function getCondition(idcondition) {
    return knex('Conditions')
        .where('IdCondition', idcondition);
}

// Requete knex qui retourne les conditions d'un evenement
function getConditionsOfEvenement(IdIPPE) {
    return knex('Conditions')
        .where('IdIPPE', IdIPPE);
}

function updateCondition(data, idCondition) {
    return knex('Conditions')
        .update(data)
        .where('IdCondition', idCondition)
        .returning('*')
        .then((Condition) => Condition.length);
}

// Requete knex qui insert la nouvelle condition
function insertCondition(nouvelleCondition) {
    return knex('Conditions')
        .insert(nouvelleCondition)
        .returning('*')
        .then((Condition) => Condition);
}

// Requete knex qui delete une conditions
function deleteCondition(IdCondition) {
    return knex('Conditions')
        .where({ IdCondition })
        .del()
        .returning('*')
        .then((Condition) => Condition.length);
}

module.exports = {
    getCondition,
    updateCondition,
    getConditionsOfEvenement,
    insertCondition,
    deleteCondition,
};
