/* eslint-disable no-dupe-keys */
const reqKnexPersonne = require('./personnes');

// eslint-disable-next-line jest/no-commented-out-tests
// test('Obtenir toutes les 7 personnes de la database', async () => {
//     const received = await reqKnexPersonne.getPersonnes();
//     expect(received).toHaveLength(7);
// });

test('Obtenir une personne selon son id dans la database', async () => {
    const expectedResult = [{
        IdPersonne: 4,
        TypePersonne: 'Personnage',
        NomFamille: 'Sirois',
        Prenom1: 'Danielle',
        Prenom2: null,
        Masculin: false,
        DateNaissance: new Date('1980-02-14T00:00:00.000Z'),
        Telephone: null,
        NoPermis: null,
        Adresse1: null,
        Adresse2: null,
        Ville: null,
        Province: null,
        CodePostal: null,
        Race: null,
        Taille: null,
        Poids: null,
        Yeux: null,
        Cheveux: null,
        Marques: null,
        Toxicomanie: null,
        Desorganise: null,
        Depressif: null,
        Suicidaire: null,
        Violent: null,
        Gilet: null,
        Pantalon: null,
        AutreVetement: null,
    }];
    const received = await reqKnexPersonne.getPersonneById(4);
    expect(received).toMatchObject(expectedResult);
});
