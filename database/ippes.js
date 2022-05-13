const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getIppesAll() {
    return knex('IPPE');
}
// update IPPE
async function updateIppe({
    NoEvenement,
    TypeEvenement,
    Mandat,
    Motif,
    Nature,
    DossierEnquete,
    Cour,
    NoMandat,
    NoCause,
    IdNatureCrime,
    LieuDetention,
    FinSentence,
    VuDerniereFois,
    AgentProbation,
    AgentLiberation,
    Telephone,
    Poste,
}, idIPPE) {
    try {
        await knex('IPPE')
            .where(idIPPE)
            .update({
                NoEvenement,
                TypeEvenement,
                Mandat,
                Motif,
                Nature,
                DossierEnquete,
                Cour,
                NoMandat,
                NoCause,
                IdNatureCrime,
                LieuDetention,
                FinSentence,
                VuDerniereFois,
                AgentProbation,
                AgentLiberation,
                Telephone,
                Poste,
            });
        return null;
    } catch (err) {
        console.log(err);
        return { err };
    }
}
// add IPPE
async function addIppe({
    NoEvenement,
    TypeEvenement,
    Mandat,
    Motif,
    Nature,
    DossierEnquete,
    Cour,
    NoMandat,
    NoCause,
    IdNatureCrime,
    LieuDetention,
    FinSentence,
    VuDerniereFois,
    AgentProbation,
    AgentLiberation,
    Telephone,
    Poste,
}, idPersonne) {
    try {
        await knex('IPPE')
            .insert({
                NoEvenement,
                TypeEvenement,
                Mandat,
                Motif,
                Nature,
                DossierEnquete,
                Cour,
                NoMandat,
                NoCause,
                IdNatureCrime,
                LieuDetention,
                FinSentence,
                VuDerniereFois,
                AgentProbation,
                AgentLiberation,
                Telephone,
                Poste,
            });
        const { IdIPPE } = (await knex('IPPE').where('NoEvenement', NoEvenement).select('IdIPPE'))[0];
        await knex('PersonnesIPPE')
            .insert({
                IdIPPE,
                IdPersonne: idPersonne,
            });

        return null;
    } catch (err) {
        console.log(err);
        return { err };
    }
}
// delete IPPE
async function deleteIPPE(IdIPPE) {
    try {
        await knex('PersonnesIPPE')
            .where('IdIPPE', IdIPPE)
            .del();
        await knex('Conditions')
            .where('IdIPPE', IdIPPE)
            .del();
        await knex('IPPE')
            .where('IdIPPE', IdIPPE)
            .del();

        return null;
    } catch (error) {
        console.log(error);
        return { err: error };
    }
}

// Requete knex qui retourne les informations de connexion
// Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(IPPEs) {
    const resultat = [];
    const libelleList = [];

    if (resultat[0] === undefined) {
        resultat.push(
            {
                idIPPE: IPPEs[0].IdIPPE[0],
                noEvenement: IPPEs[0].NoEvenement,
                typeEvenement: IPPEs[0].TypeEvenement,
                mandat: IPPEs[0].Mandat,
                motif: IPPEs[0].Motif,
                nature: IPPEs[0].Nature,
                dossierEnquete: IPPEs[0].DossierEnquete,
                cour: IPPEs[0].Cour,
                noMandat: IPPEs[0].NoMandat,
                noCause: IPPEs[0].NoCause,
                idNatureCrime: IPPEs[0].idNatureCrime,
                lieuDetention: IPPEs[0].LieuDetention,
                finSentence: IPPEs[0].FinSentence,
                vuDerniereFois: IPPEs[0].VuDerniereFois,
                conditions: libelleList,
                agentProbation: IPPEs[0].AgentProbation,
                agentLiberation: IPPEs[0].AgentLiberation,
                telephone: IPPEs[0].Telephone,
                poste: IPPEs[0].Poste,
                conditions: [], // eslint-disable-line
            },
        );
    }

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
                    dossierEnquete: ippe.DossierEnquete,
                    cour: ippe.Cour,
                    noMandat: ippe.NoMandat,
                    noCause: ippe.NoCause,
                    idNatureCrime: ippe.idNatureCrime,
                    lieuDetention: ippe.LieuDetention,
                    finSentence: ippe.FinSentence,
                    vuDerniereFois: ippe.VuDerniereFois,
                    conditions: libelleList,
                    agentProbation: ippe.AgentProbation,
                    agentLiberation: ippe.AgentLiberation,
                    telephone: ippe.Telephone,
                    poste: ippe.Poste,
                    conditions: [], // eslint-disable-line
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

module.exports = {
    deleteIPPE,
    getIppesAll,
    getIPPE,
    // chercherPersonne,
    // chercherEvent,
    // chercherConditions,
    // getTypeEvenement,
    // formatterTypeEvenement,
    updateIppe,
    addIppe,
};
