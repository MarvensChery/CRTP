const requeteKnex = require('./database/requeteKnex');

test('Réponse ***RECHERCHÉ***', async () => {
  const resultat = {
    nomFamille: 'Ducharme',
    prenom1: 'Benoit',
    prenom2: null,
    sexe: 'Masculin',
    dateNaissance: '1975/8/30',
    mandat: 'Arrestation',
    cour: 'Municipale de longueuil',
    noMandat: 'CM-LGL-A-26840',
    natureCrime: 'Agression armée',
    noEvenement: '108-220208-0031',
    TypeEvenement: 'Recherché',
  };
  const ippe = await requeteKnex.getIPPE('Ducharme', 'Benoit', null, true, new Date('1975-08-31'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***SOUS OBSERVATION***', async () => {
  const resultat = {
    nomFamille: 'Sirois',
    prenom1: 'Danielle',
    prenom2: null,
    sexe: 'Féminin',
    dateNaissance: '1980/2/13',
    mandat: 'Fréquentation criminelle',
    natureCrime: 'Fraude et prêt usuraires',
    noEvenement: '302-220131-0056',
    DossierEnquete: 'LVL-RENS-468259',
    TypeEvenement: 'Sous observation',
  };
  const ippe = await requeteKnex.getIPPE('Sirois', 'Danielle', null, false, new Date('1980-02-14'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***ACCUSÉ***', async () => {
  const resultat = {
    nomFamille: 'Bélanger',
    prenom1: 'Claude',
    prenom2: null,
    sexe: 'Masculin',
    dateNaissance: '1976/7/11',
    cour: 'Municipale de Montréal',
    noMandat: 'CM-MTL-57931-852',
    natureCrime: 'Voies de fait',
    noEvenement: '123-220115-0014',
    TypeEvenement: 'Accusé',
  };
  const ippe = await requeteKnex.getIPPE('Bélanger', 'Claude', null, true, new Date('1976-07-12'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***PROBATION***', async () => {
  const resultat = {
    nomFamille: 'Levasseur',
    prenom1: 'Marc',
    prenom2: null,
    sexe: 'Masculin',
    dateNaissance: '1971/11/6',
    cour: 'Municipale de Montréal',
    noMandat: 'CM-MTL-58246-829',
    natureCrime: 'Intimidation',
    noEvenement: '123-200303-0026',
    FinSentence: '2022/2/28',
    Agent: 'David Chapdelaine',
    Telephone: '5142547131',
    Poste: 'ext222',
    TypeEvenement: 'Probation',
  };
  const ippe = await requeteKnex.getIPPE('Levasseur', 'Marc', null, true, new Date('1971-11-07'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***LIBÉRATION CONDITIONNELLE***', async () => {
  const resultat = {
    nomFamille: 'Hébert',
    prenom1: 'Francis',
    prenom2: null,
    sexe: 'Masculin',
    dateNaissance: '1992/10/18',
    cour: 'Cour du Québec',
    noMandat: '500-01-310-35719-654',
    natureCrime: 'Tentative de meurtre',
    noEvenement: '108-110525-0003',
    LieuDetention: 'Prison de port-Cartier',
    FinSentence: '2022/9/18',
    Agent: 'Benoit Ducharme',
    Telephone: '5142745131',
    Poste: null,
    TypeEvenement: 'Libération Conditionnelle',
  };
  const ippe = await requeteKnex.getIPPE('Hébert', 'Francis', null, true, new Date('1992-10-19'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***DISPARU***', async () => {
  const resultat = {
    nomFamille: 'Amoussougbo',
    prenom1: 'Yaken',
    prenom2: null,
    sexe: 'Masculin',
    dateNaissance: '2000/3/13',
    mandat: 'Disparition',
    noEvenement: '302-220208-0016',
    VuDerniereFois: '3546 boul. Dee la Concorde Est, Laval',
    TypeEvenement: 'Disparu',
  };
  const ippe = await requeteKnex.getIPPE('Amoussougbo', 'Yaken', null, true, new Date('2000-03-14'));

  expect(ippe).toEqual(resultat);
});

test('Réponse ***INTERDIT***', async () => {
  const resultat = {
    nomFamille: 'Lemire',
    prenom1: 'Jessy',
    prenom2: null,
    sexe: 'Féminin',
    dateNaissance: '1985/10/27',
    mandat: null,
    cour: 'Municipale de Montréal',
    noMandat: 'CM-MTL-16794-356',
    natureCrime: 'Capacité de conduire affaiblie',
    noEvenement: '123-201225-0016',
    FinSentence: '2022/10/28',
    TypeEvenement: 'Interdit',
  };
  const ippe = await requeteKnex.getIPPE('Lemire', 'Jessy', null, false, new Date('1985-10-28'));

  expect(ippe).toEqual(resultat);
});
