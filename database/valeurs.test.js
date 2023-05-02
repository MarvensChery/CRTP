/* eslint-disable no-dupe-keys */
const reqKnexValeur = require('./valeurs');

test('Obtenir tous les 4 IBVA de la database', async () => {
    const received = await reqKnexValeur.getValeursAll();
    expect(received).toHaveLength(4);
});

test('Obtenir un IBVA selon son id dans la database', async () => {
    const expectedResult = [{
        IdIBVA: 5,
        Identifiant: '628181-4249-96708',
        Auteur: 'MASTERCARD',
        TypeValeur: 'Carte de crédit / débit',
        TypeEvenement: 'Perdu',
        NoEvenement: '123-220301-0007',
    }];
    const received = await reqKnexValeur.getValeurById(5);
    expect(received).toMatchObject(expectedResult);
});
