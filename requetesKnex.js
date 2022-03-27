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

// Requete knex qui retourne les informations de personnes pour la banque de personnes - Nathan
function getPersonnes() {
    return knex('Personnes');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

// function getFPS(DataIdPersonne) {
//     return knex('FPS')
//         .where('FPS.IdPersonne', DataIdPersonne)
//         .join('Personnes', 'FPS.IdPersonne', 'Personnes.IdPersonne')
//         .select(
//             'FPS.*',
//             'Personnes.Race',
//             'Personnes.Taille',
//             'Personnes.Poids',
//             'Personnes.Yeux',
//             'Personnes.Cheveux',
//             'Personnes.Marques',
//             'Personnes.Toxicomanie',
//             'Personnes.Desorganise',
//             'Personnes.Depressif',
//         );
// }

// // Fonction qui manie l'affichage de la reponse IPPE
// function formatterIPPE(dataIPPE, dataFps) {
//     const dataToSend = [];
//     const libelleList = [];

//     dataIPPE.forEach((data) => {
//         // Verifie si l'information IPPE se trouve deja dans les datas a envoyer
//         const dupCheck = dataToSend.some((element) => element.IdIPPE === data.IdIPPE);
//         if (dupCheck) {
//             // ajoute les conditions aux tableau afin de les afficher plus tard
//             libelleList.push(data.Libelle);
//         } else {
//             // si aucunes conditions n'est presente rien est envoyer dans le tableau de conditions
//             libelleList.push(data.Libelle ? data.Libelle : null);

//             // le switch trie les elements a envoyer pour ne pas envoyer d'information inutile
//             switch (data.TypeEvenement) {
//             case 'Recherché':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Recherché',
//                         mandat: data.Mandat,
//                         cour: data.Cour,
//                         noMandat: data.NoMandat,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                     },
//                 );
//                 break;
//             case 'Sous observation':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Sous Observation',
//                         motif: data.Motif,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                         dossierEnquete: data.DossierEnquete,

//                     },
//                 );
//                 break;
//             case 'Accusé':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Accusé',
//                         cour: data.Cour,
//                         noCause: data.NoCause,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                         conditions: libelleList,
//                     },
//                 );
//                 break;
//             case 'Probation':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Probation',
//                         cour: data.Cour,
//                         noCause: data.NoCause,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                         finSentence: data.FinSentence,
//                         conditions: libelleList,
//                         agentProbation: data.AgentProbation,
//                         telephone: data.Telephone,
//                         poste: data.Poste,
//                     },
//                 );
//                 break;
//             case 'Libération Conditionnelle':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Libération Conditionnelle',
//                         cour: data.Cour,
//                         noCause: data.NoCause,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                         fps: dataFps[0].NoFPS,
//                         lieuDetention: data.LieuDetention,
//                         finSentence: data.FinSentence,
//                         conditions: libelleList,
//                         agentLiberation: data.AgentLiberation,
//                         telephone: data.Telephone,
//                         poste: data.Poste,
//                     },
//                 );
//                 break;
//             case 'Disparu':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Disparu',
//                         noEvenement: data.NoEvenement,
//                         nature: data.Nature,
//                         vuDerniereFois: data.VuDerniereFois,
//                         descrPhysique: {
//                             race: data.Race,
//                             taille: data.Taille,
//                             poids: data.Poids,
//                             yeux: data.Yeux,
//                             cheveux: data.Cheveux,
//                             marques: data.Marques,
//                         },
//                         descrVestimentaire: {
//                             gilet: data.Gilet,
//                             pantalon: data.Pantalon,
//                             autreVetements: data.AutreVetement,
//                         },
//                         problemesSante: {
//                             toxicomanie: data.Toxicomanie,
//                             desorganise: data.Desorganise,
//                             depressif: data.Depressif,
//                             suicidaire: data.Suicidaire,
//                             violent: data.Violent,
//                         },
//                     },
//                 );
//                 break;
//             case 'Interdit':
//                 dataToSend.push(
//                     {
//                         idPersonne: data.IdPersonne[0],
//                         idIPPE: data.IdIPPE[0],
//                         titre: 'Interdit',
//                         nature: data.Nature,
//                         cour: data.Cour,
//                         noCause: data.NoCause,
//                         natureCrime: data.NatureCrime,
//                         noEvenement: data.NoEvenement,
//                         expiration: data.FinSentence,
//                     },
//                 );
//                 break;
//             default:
//             }
//         }
//     });

//     // gere les doublons en les supprimants
//     const result = dataToSend.reduce((unique, o) => {
//         if (!unique.some((obj) => obj.noEvenement === o.noEvenement && obj.value === o.value)) {
//             unique.push(o);
//         }
//         return unique;
//     }, []);

//     return result;
// }

// // Fonction qui prend en charge l'affichage des FPS
// function formatterFPS(dataFPS) {
//     const dataToSend = [];
//     dataToSend.push({
//         titre: 'FPS',
//         NoFPS: dataFPS[0].NoFPS,
//         DateMesure: dataFPS[0].DateMesure,
//         CD: dataFPS[0].CD,
//         Antecedents: dataFPS[0].Antecedents,
//         Violent: dataFPS[0].Violent,
//         Echappe: dataFPS[0].Echappe,
//         Suicidaire: dataFPS[0].Suicidaire,
//         Desequilibre: dataFPS[0].Desequilibre,
//         Contagieux: dataFPS[0].Contagieux,
//         Race: dataFPS[0].Race,
//         Taille: dataFPS[0].Taille,
//         Poids: dataFPS[0].Poids,
//         Yeux: dataFPS[0].Yeux,
//         Cheveux: dataFPS[0].Cheveux,
//         Marques: dataFPS[0].Marques,
//         Toxicomanie: dataFPS[0].Toxicomanie,
//         Desorganise: dataFPS[0].Desorganise,
//         Depressif: dataFPS[0].Depressif,
//     });

//     return dataToSend;
// }

// async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
//     const resultat = [];
//     const reponseIPPE = await knex('Personnes')
//         .where('NomFamille', nomFamille)
//         .andWhere('Prenom1', prenom1)
//         .andWhere('Prenom2', prenom2)
//         .andWhere('Masculin', masculin)
//         .andWhere('DateNaissance', dateNaissance)
//         .leftJoin('PersonnesIPPE', 'Personnes.IdPersonne', 'PersonnesIPPE.IdPersonne')
//         .leftJoin('IPPE', 'PersonnesIPPE.IdIPPE', 'IPPE.IdIPPE')
//         .leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.IdIPPE')
//         .select('*');

//     // Recherche si la personne possede un dossier FPS et le push a la reponse
//     const reponseFPS = await getFPS(reponseIPPE[0].IdPersonne[0]);
//     const IPPEresult = formatterIPPE(reponseIPPE, reponseFPS);
//     IPPEresult.forEach((element) => {
//         resultat.push(element);
//     });
//     if (reponseFPS.length !== 0) {
//         const FPSresult = formatterFPS(reponseFPS);

//         FPSresult.forEach((element) => {
//             resultat.push(element);
//         });
//     }
//     resultat[0].nomFamille = nomFamille
//     resultat[0].prenom1 = prenom1
//     resultat[0].prenom2 = prenom2
//     resultat[0].masculin = masculin
//     resultat[0].dateNaissance = dateNaissance
//     return resultat;
// }

function formatterIPPE(IPPEs) {
    const resultat = [];
    const libelleList = [];

    IPPEs.forEach((ippe) => {
        console.log(ippe)
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
                    conditions: [],
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
    //"NomFamille":"Levasseur","Prenom1":"Marc","Prenom2":null,"Masculin":true,"DateNaissance":"1971-11-07T00:00:00.000Z"
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
    
    resultat[0].DateNaissance = resultat[0].DateNaissance
    
    return resultat;
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

// Requete knex qui delete une conditions
function DeleteCondition(IdCondition) {
    return knex('Conditions')
        .where({ IdCondition })
        .del();
}


module.exports = {
    connexion,
    getIPPE,
    // getFPS,
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
};
