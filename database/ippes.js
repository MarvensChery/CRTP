const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getIppesAll() {
    return knex('IPPE');
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

// Permet d'avoir un évènement d'une personne particulièrement celle qu'on a prévu de modifié
async function 

getInfoPersonneIppe(IdPersonne, IdIPPE) {
    const data = await knex('personnes').first()
        .fullOuterJoin('PersonnesIPPE', 'PersonnesIPPE.IdPersonne', 'Personnes.IdPersonne')
        .fullOuterJoin('IPPE', 'IPPE.IdIPPE', 'PersonnesIPPE.IdIPPE')
        .leftOuterJoin('Conditions', 'Conditions.IdPersonne', 'PersonnesIPPE.IdPersonne')
        .leftOuterJoin('Crimes', 'Crimes.IdCrime', 'IPPE.IdNatureCrime')
        .where('Personnes.IdPersonne', IdPersonne)
        .andWhere('IPPE.IdIPPE', IdIPPE);

    const conditions = await knex('Conditions').where('Conditions.IdIPPE', IdIPPE);
    let libelleList = [];
    conditions.forEach((element) => {
        if (element.Libelle !== null) {
            if (element.Libelle.includes('entrer en contact')) libelleList.push(`${element.Libelle} ${element.Victime}`);
            else if (element.Libelle.includes('fréquenter')) libelleList.push(`${element.Libelle} ${element.Frequentation}`);
            else if (element.Libelle.includes('Avoir comme adresse')) libelleList.push(`${element.Libelle} ${data.Adresse1} ${data.Ville} ${data.Province} ${data.CodePostal}`);
            else libelleList.push(element.Libelle);
        } else {
            // si aucunes conditions n'est presente rien est envoyer dans le tableau de conditions
            libelleList = null;
        }
    });
    const dataTosend = {
        data,
        libelleList,
    };

    return dataTosend;
}

// Requete knex pour ajouter un évènement  IPPE à  personne
async function insertIppePersonne(IdPersonne, IPPE) {
    await knex('IPPE').insert(IPPE);
    const lastIdIppe = await knex('IPPE').max('IdIPPE as IdIPPE').first();
    await knex('PersonnesIPPE').insert({ IdPersonne, IdIPPE: lastIdIppe.IdIPPE });
    return lastIdIppe;
}
// Requete knex pour modifier un IPPE
async function updateIppe(IdIPPE, IPPE) {
    return knex('IPPE')
        .update(IPPE)
        .where('IdIPPE', IdIPPE);
}

// Requete knex pour Supprimer les réponses IPPE d'une personne
async function deleteResponse(IdIPPE) {
    await knex('Conditions')
        .where('IdIPPE', IdIPPE)
        .del();
    await knex('PersonnesIPPE')
        .where('IdIPPE', IdIPPE)
        .del();
    const delIPPE = await knex('IPPE')
        .where('IdIPPE', IdIPPE)
        .del();
    return delIPPE;
}

// Requete Knex pour obtenir IPPE
async function getIPPE(IdIPPE) {
    const data = await knex('IPPE')
        .where('IdIPPE', IdIPPE);
    return data;
}

module.exports = {
    deleteIPPE,
    getIppesAll,
    getIPPE,
    insertIppePersonne,
    getInfoPersonneIppe,
    updateIppe,
    deleteResponse,
    formatterIPPE, // pas utiliser en ce moment!
};
