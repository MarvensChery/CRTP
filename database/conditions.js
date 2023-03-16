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

// Requete knex qui update une condition avec une adresse
function updateAdresse(Idpersonne, Adresse1, Adresse2, Ville, Province, CodePostal) {
    return knex('Personnes')
        .where({ Idpersonne })
        .update({
            Adresse1, Adresse2, Ville, Province, CodePostal,
        });
}

// Requete knex qui update une condition avec une victime
function updateVictime(IdCondition, Victime) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ Victime });
}

// Requete knex qui update une condition avec une frequentation
function updateFrequentation(IdCondition, Frequentation) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ Frequentation });
}

// Requete knex qui update les heures d'une conditions
function updateHeure(IdCondition, HeureDebut, HeureFin) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ HeureDebut })
        .update({ HeureFin });
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
    updateAdresse,
    returnConditionsOfEvenement,
    updateVictime,
    updateFrequentation,
    updateHeure,
    ajouterCondition,
    deleteCondition,
};
