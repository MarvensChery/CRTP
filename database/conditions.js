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
function ajouterCondition(Idippe, Condition, Idpersonne) {
    return knex('Conditions')
        .insert({ IdIPPE: Idippe, Libelle: Condition, IdPersonne: Idpersonne });
}

// Requete knex qui insert la nouvelle condition avec une victime
function ajouterConditionAvecVictime(Idippe, Condition, victime, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, Victime: victime, IdPersonne: Idpersonne,
        });
}

// Requete knex qui insert la nouvelle condition avec une frequentation
function ajouterConditionAvecFrequentation(Idippe, Condition, frequentation, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, Frequentation: frequentation, IdPersonne: Idpersonne,
        });
}

// Requete knex qui insert la nouvelle condition avec une frequentation
function ajouterConditionAvecHeure(Idippe, Condition, heuredebut, heurefin, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, HeureDebut: heuredebut, HeureFin: heurefin, IdPersonne: Idpersonne,
        });
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
    ajouterConditionAvecVictime,
    ajouterConditionAvecFrequentation,
    ajouterConditionAvecHeure,
    deleteCondition,
};
