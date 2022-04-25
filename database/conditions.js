const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test


// Requete knex qui retourne les informations de la condition
function ReturnCondition(idcondition) {
    return knex('Conditions')
        .where('IdCondition', idcondition);
}

// Requete knex qui retourne les informations de la condition
function ReturnIdippe(Idpersonne) {
    return knex('PersonnesIPPE')
        .where('IdPersonne', Idpersonne);
}

// Requete knex qui update une condition avec une adresse
function UpdateAdresse(Idpersonne, Adresse1) {
    return knex('Personnes')
        .where({ Idpersonne })
        .update({ Adresse1 });
}

// Requete knex qui update une condition avec une victime
function UpdateVictime(IdCondition, Victime) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ Victime });
}

// Requete knex qui update une condition avec une frequentation
function UpdateFrequentation(IdCondition, Frequentation) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ Frequentation });
}

// Requete knex qui update les heures d'une conditions
function UpdateHeure(IdCondition, HeureDebut, HeureFin) {
    return knex('Conditions')
        .where({ IdCondition })
        .update({ HeureDebut })
        .update({ HeureFin });
}

// Requete knex qui insert la nouvelle condition
function AjouterCondition(Idippe, Condition, Idpersonne) {
    return knex('Conditions')
        .insert({ IdIPPE: Idippe, Libelle: Condition, IdPersonne: Idpersonne });
}

// Requete knex qui insert la nouvelle condition avec une victime
function AjouterConditionAvecVictime(Idippe, Condition, victime, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, Victime: victime, IdPersonne: Idpersonne,
        });
}

// Requete knex qui insert la nouvelle condition avec une frequentation
function AjouterConditionAvecFrequentation(Idippe, Condition, frequentation, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, Frequentation: frequentation, IdPersonne: Idpersonne,
        });
}

// Requete knex qui insert la nouvelle condition avec une frequentation
function AjouterConditionAvecHeure(Idippe, Condition, heuredebut, heurefin, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe, Libelle: Condition, HeureDebut: heuredebut, HeureFin: heurefin, IdPersonne: Idpersonne,
        });
}

// Requete knex qui delete une conditions
function DeleteCondition(IdCondition) {
    return knex('Conditions')
        .where({ IdCondition })
        .del();
}


module.exports = {
    ReturnCondition,
    UpdateAdresse,
    UpdateVictime,
    UpdateFrequentation,
    UpdateHeure,
    AjouterCondition,
    ReturnIdippe,
    AjouterConditionAvecVictime,
    AjouterConditionAvecFrequentation,
    AjouterConditionAvecHeure,
    DeleteCondition,
};
