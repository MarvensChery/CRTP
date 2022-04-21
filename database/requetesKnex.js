<<<<<<< HEAD
/* eslint-disable no-return-await */
const knexModule = require('knex');
const constantes = require('../constantes');

const knex = knexModule(constantes);
=======
const knexModule = require('knex');
const constantes = require('../constantes');

const knex = knexModule(constantes.chaineConnexion);
>>>>>>> dev

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

<<<<<<< HEAD
// retourne toutes les valeurs
function getData(typedb) {
    return knex(typedb);
}

// retourne les donnees avec le mm id
function getDataById(typedb, id) {
    return knex(typedb).where(`Id${typedb}`, id);
}

// retourne les donnees avec le mm numero d'evenement
function getDataByNoEvent(typedb, id) {
    return knex(typedb).where('NoEvenement', id);
}

// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(IPPEs) {
    const resultat = [];
    const libelleList = [];
=======
// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(IPPEs) {
    const resultat = [];
>>>>>>> dev

    IPPEs.forEach((ippe) => {
        // Verifie si l'information IPPE se trouve deja dans les datas a envoyer
        if (!resultat.some((element) => element.idIPPE === ippe.IdIPPE[0])) {
            // Nouvel événement IPPE, on ajoute un objet IPPE au résultat
            resultat.push(
                {
                    idIPPE: ippe.IdIPPE[0],
                    noEvenement: ippe.NoEvenement,
                    typeEvenement: ippe.TypeEvenement,
                    mandat: ippe.Mandat,
                    motif: ippe.Motif,
                    nature: ippe.Nature,
                    dossierEnquête: ippe.dossierEnquete,
                    cour: ippe.Cour,
                    noMandat: ippe.NoMandat,
                    noCause: ippe.NoCause,
                    idNatureCrime: ippe.idNatureCrime,
                    lieuDetention: ippe.LieuDetention,
                    finSentence: ippe.FinSentence,
                    vuDerniereFois: ippe.VuDerniereFois,
<<<<<<< HEAD
                    conditions: libelleList,
=======
>>>>>>> dev
                    agentProbation: ippe.AgentProbation,
                    agentLiberation: ippe.AgentLiberation,
                    telephone: ippe.Telephone,
                    poste: ippe.Poste,
<<<<<<< HEAD
=======
                    conditions: [],
>>>>>>> dev
                },
            );
        } else {
            resultat[resultat.length - 1].conditions.push(
                {
                    idCondition: ippe.IdCondition,
                    libelle: ippe.Libelle,
                    heureDebut: ippe.HeureDebut,
                    heureFin: ippe.HeureFin,
                    victime: ippe.Victime,
                    frequentation: ippe.Frequentation,
                },
            );
        }
    });

    return resultat;
}

async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
    const resultat = await knex('Personnes')
        .where({
            NomFamille: nomFamille,
            Prenom1: prenom1,
            Prenom2: prenom2,
            Masculin: masculin,
            DateNaissance: dateNaissance,
        });

    if (resultat.length === 0) return resultat;

    // La personne existe: on récupère sa signalisation FPS si elle en a une
    const FPS = await knex('FPS')
        .where('FPS.IdPersonne', resultat[0].IdPersonne);
    // eslint-disable-next-line prefer-destructuring
    resultat[0].FPS = FPS.length === 0 ? null : FPS[0];

    // On récupère les événements IPPE associés si elle en a
    resultat[0].IPPE = await knex('PersonnesIPPE')
        .join('IPPE', 'PersonnesIPPE.IdIPPE', 'IPPE.IdIPPE')
        .leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.IdIPPE')
        .where('PersonnesIPPE.IdPersonne', resultat[0].IdPersonne);

    if (resultat[0].IPPE.length === 0) return resultat;

    // La personne a des événements IPPE associés: on les formate
    resultat[0].IPPE = formatterIPPE(resultat[0].IPPE);

    return resultat;
}

<<<<<<< HEAD
// ajoute la donnee a la base
async function addData(bd, data) {
    return await knex(bd)
        .insert(data);
}

// update la donnee avec le mm id
async function updateData(typedb, data, id) {
    return await knex(typedb)
        .update(data)
        .where(`Id${typedb}`, id);
}

// delete la donnee avec le mm id
async function deleteData(typedb, id) {
    return await knex(typedb)
        .where(`Id${typedb}`, id)
        .del();
}

module.exports = {
    connexion,
    getIPPE,
    getData,
    addData,
    updateData,
    deleteData,
    getDataById,
    getDataByNoEvent,
=======
module.exports = {
    connexion,
    getIPPE,
>>>>>>> dev
};
