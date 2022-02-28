const knex = require('knex')({
  client: 'mssql',
  connection: {
    host: 'sv55.cmaisonneuve.qc.ca',
    user: '4D1EQUIPE06',
    password: 'pwn852',
    database: '4D1Equipe06',
  },
  useNullAsDefault: false,
});

function getPersonne() {
  return knex('Personnes');
}

function getUtilisateurs() {
  return knex('Utilisateurs');
}

function getConditions() {
  return knex('Conditions');
}

function getFPS() {
  return knex('FPS');
}

function getIBAF() {
  return knex('IBAF');
}

function getIBOB() {
  return knex('IBOB');
}

function getIBVA() {
  return knex('IBVA');
}
// nomFamille, prenom1, prenom2, masculin, dateNaissance
async function getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance) {
  const resultat = await knex('Personnes')
    // .select("NomFamille", "Prenom1", "Prenom2", "Masculin", "DateNaissance", "Raison", "Cour",  "noCour", "NatureCrime", "noEvenement")
    .join('ippe', 'Personnes.Id', '=', 'IPPE.IdPersonne')
    .where({
      nomFamille,
      prenom1,
      prenom2: prenom2 == 'null' ? null : prenom2,
      masculin,
      dateNaissance,
    });

  console.log(resultat[0]);
  
  const date = new Date(resultat[0].DateNaissance);

  switch (resultat[0].TypeEvenement) {
    case 'Recherché':
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        mandat: resultat[0].Raison,
        cour: resultat[0].Cour,
        noMandat: resultat[0].NoCour,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
      };

    case 'Sous observation':
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        mandat: resultat[0].Raison,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
        DossierEnquete: resultat[0].DossierEnquete,
      };

    case 'Accusé':
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        cour: resultat[0].Cour,
        noMandat: resultat[0].NoCour,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
        Conditions: resultat[0].Conditions,
      };

    case 'Probation':
        const datefinsentence = new Date(resultat[0].FinSentence);
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        cour: resultat[0].Cour,
        noMandat: resultat[0].NoCour,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
        Conditions: resultat[0].Conditions,
        FinSentence: datefinsentence.toLocaleDateString('zh-Hans-CN'),
        Agent: resultat[0].Agent,
        Telephone: resultat[0].Telephone,
        Poste: resultat[0].Poste,
      };

    case 'Libération Conditionnelle':
        const datefinsentencee = new Date(resultat[0].FinSentence);
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        cour: resultat[0].Cour,
        noMandat: resultat[0].NoCour,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
        //Conditions: resultat[0].Conditions,
        LieuDetention: resultat[0].LieuDetention,
        FinSentence: datefinsentencee.toLocaleDateString('zh-Hans-CN'),
        Agent: resultat[0].Agent,
        Telephone: resultat[0].Telephone,
        Poste: resultat[0].Poste,
      };

    case 'Disparu':
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        mandat: resultat[0].Raison,
        noEvenement: resultat[0].NoEvenement,
        VuDerniereFois: resultat[0].VuDerniereFois,
      };

    case 'Interdit':
        const datefinsentenceee = new Date(resultat[0].FinSentence);
      return {
        nomFamille: resultat[0].NomFamille,
        prenom1: resultat[0].Prenom1,
        prenom2: resultat[0].Prenom2,
        sexe: resultat[0].Masculin ? 'Masculin' : 'Féminin',
        dateNaissance: date.toLocaleDateString('zh-Hans-CN'),
        mandat: resultat[0].Raison,
        cour: resultat[0].Cour,
        noMandat: resultat[0].NoCour,
        natureCrime: resultat[0].NatureCrime,
        noEvenement: resultat[0].NoEvenement,
        FinSentence: datefinsentenceee.toLocaleDateString('zh-Hans-CN'),
      };
  }

  return finalresultat;
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
};
