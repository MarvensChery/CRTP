const path = require("path");

const knex = require("knex")({
    client: "mssql",
    connection: {
        host: "sv55.cmaisonneuve.qc.ca",
        user : '4D1EQUIPE06',
        password : 'pwn852',
        database : '4D1Equipe06'
      },
    useNullAsDefault: false
});

function getPersonne() {
    return knex("Personnes");
}

function getUtilisateurs() {
    return knex("Utilisateurs");
}

function getConditions() {
    return knex("Conditions");
}

function getFPS() {
    return knex("FPS");
}

function getIBAF() {
    return knex("IBAF");
}

function getIBOB() {
    return knex("IBOB");
}

function getIBVA() {
    return knex("IBVA");
}
//nomFamille, prenom1, prenom2, masculin, dateNaissance
async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
    
    let resultat = await knex("Personnes")
    //.select("NomFamille", "Prenom1", "Prenom2", "Masculin", "DateNaissance", "Raison", "Cour",  "noCour", "NatureCrime", "noEvenement")
    .join("ippe", "Personnes.Id", "=", "IPPE.IdPersonne")
    .where({
        'nomFamille' : nomFamille,
        'prenom1' : prenom1,
        'prenom2' : prenom2 == 'null' ? null: prenom2,
        'masculin' : masculin,
        'dateNaissance' : dateNaissance,
    })

    console.log(resultat[0])
    
    var date = new Date(resultat[0].DateNaissance)

    switch (resultat[0].TypeEvenement) {
        case 'Recherché':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin? 'Masculin': 'Féminin',
                dateNaissance : date.toLocaleDateString(),
                mandat: resultat[0].Raison,
                cour: resultat[0].Cour,
                noMandat: resultat[0].NoCour,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement
            }
        
        case 'Sous observation':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString(),
                mandat: resultat[0].Raison,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement,
                DossierEnquete: resultat[0].DossierEnquete
            }

        case 'Accusé':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString(),
                cour: resultat[0].Cour,
                noMandat: resultat[0].NoCour,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement,
                Conditions: resultat[0].Conditions
            }

        case 'Probation':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString(),
                cour: resultat[0].Cour,
                noMandat: resultat[0].NoCour,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement,
                Conditions: resultat[0].Conditions,
                FinSentence: resultat[0].FinSentence,
                Agent: resultat[0].Agent,
                Telephone: resultat[0].Telephone,
                Poste: resultat[0].Poste
            }
            
        case 'Libération conditionnelle':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString(),
                cour: resultat[0].Cour,
                noMandat: resultat[0].NoCour,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement,
                Conditions: resultat[0].Conditions,
                LieuDetention: resultat[0].LieuDetention,
                FinSentence: resultat[0].FinSentence,
                Agent: resultat[0].Agent,
                Telephone: resultat[0].Telephone,
                Poste: resultat[0].Poste
            }

        case 'Disparu':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString(),
                mandat: resultat[0].Raison,
                noEvenement: resultat[0].NoEvenement,
                VuDerniereFois: resultat[0].VuDerniereFois
            }

        case 'Interdit':
            return {
                nom : resultat[0].NomFamille,
                prenom1 : resultat[0].Prenom1,
                prenom2 : resultat[0].Prenom2,
                sexe : resultat[0].Masculin,
                dateNaissance : date.toLocaleDateString('en-US'),
                mandat: resultat[0].Raison,
                cour: resultat[0].Cour,
                noMandat: resultat[0].NoCour,
                natureCrime: resultat[0].NatureCrime,
                noEvenement: resultat[0].NoEvenement,
                FinSentence: resultat[0].FinSentence
            }
    }

    return finalresultat
}

module.exports = {
    getPersonne,
    getUtilisateurs,
    getConditions,
    getFPS,
    getIBAF,
    getIBOB,
    getIBVA,
    getIPPE,
}