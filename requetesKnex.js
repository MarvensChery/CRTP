const knex = require('knex')({
    client: 'mssql',
    connection: {
        host: 'sv55.cmaisonneuve.qc.ca',
        user: '4D1Equipe06',
        password: 'pwn852',
        database: '4D1Equipe06',
        options: {
            enableArithAbort: false,
        },
    },
    pool: { min: 0, max: 7 },
});

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

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

// Requete knex qui retourne les informations de personnes pour la banque de personnes
function getPersonnes() {
    return knex('Personnes');
}

// Requete knex qui retourne les informations de la personnes avec son id
function ReturnPersonne(Idpersonne) {
    return knex('Personnes')
        .where('IdPersonne', Idpersonne);
}

// Requete knex qui retourne les informations de la condition
function ReturnCondition(idcondition) {
    return knex('Conditions')
        .where('IdCondition', idcondition);
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
            IdIPPE: Idippe,
            Libelle: Condition,
            Frequentation: frequentation,
            IdPersonne: Idpersonne,
        });
}
// Requete knex qui insert la nouvelle condition avec une frequentation
function AjouterConditionAvecHeure(Idippe, Condition, heuredebut, heurefin, Idpersonne) {
    return knex('Conditions')
        .insert({
            IdIPPE: Idippe,
            Libelle: Condition,
            HeureDebut: heuredebut,
            HeureFin: heurefin,
            IdPersonne: Idpersonne,
        });
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

// Requete knex qui delete une conditions
function DeleteCondition(IdCondition) {
    return knex('Conditions')
        .where({ IdCondition })
        .del();
}

module.exports = {
    connexion,
    getIPPE,
    getPersonnes,
    AjouterCondition,
    UpdateAdresse,
    UpdateVictime,
    DeleteCondition,
    UpdateFrequentation,
    AjouterConditionAvecVictime,
    AjouterConditionAvecFrequentation,
    AjouterConditionAvecHeure,
    ReturnCondition,
    ReturnPersonne,
    UpdateHeure,
};
