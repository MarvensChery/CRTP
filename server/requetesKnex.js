const path = require("path");
//module
const  knexModule=require('knex');

//connection serveur
const knex = knexModule({
client: 'mssql',
connection: {
host: 'sv55.cmaisonneuve.qc.ca',
user: '4D1Equipe05',
password: 'njt862',
database: '4D1Equipe05',
options: {
 enableArithAbort: false,
},
 },
 pool: { min: 0, max: 7 },
});

//retourne la liste des personne selon les parametre indiquer de la table Personne
async function getPersonne(nom,prenom1,prenom2,sexe,ddn) { 
    return knex('Personnes')
        .where('NomFamille', nom)
        .where('Prenom1', prenom1)
        .where('Prenom2', prenom2)
        .where('DateNaissance', ddn)
        .where('Masculin', sexe)
}

//retourne les conditions selon l'id indiquer de la table Condition
async function getCondition(Id) { 
    return knex('Conditions')
        .where('IdIPPE', Id)
}

//retourner les personnes présente dans la table IPPE selon l'id de la personne indiquer 
async function getIPPE(Id) { 
    return knex('IPPE')
        .where('IdPersonne', Id)
}

//retouner un user selon l'id du user indiquer de la table Utilisateurs
async function getUser(user) { 
        return knex('Utilisateurs')
            .where('Identifiant', '=', user)
    }

//retouner tous les users de la tables Utilisateurs
async function getAllUser() { 
        return knex('Utilisateurs')
    }    

    //exporte les fonctions
module.exports = {
    getPersonne,
    getUser,
    knex,
    getIPPE,
    getCondition,
    getAllUser
}