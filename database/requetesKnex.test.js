const { TestWatcher } = require('jest');
const reqKnex = require('./ippes');
const { getArmesAll, getArmeById } = require('./armes');
const reqKnexObjet = require('./objets');
const reqKnexValeur = require('./valeurs');

// test Vérifie la fonction getIPPE
test('get Ippe by id dans database', async () => {
    const expectedResult = await reqKnex.getIPPE(8);
    expect(expectedResult.length).toEqual(1);
});

// getIppePersonne,

// verifier la fonction getArmeAll
const result = async () => { await getArmesAll(); };

describe('getArmesAll()', () => {
    test('le premier objet de la liste a une propriete nom', async () => {
        expect(result[0]).toHaveProperty('nom');
    });
    test('le resultat ne doit pas etre vide', async () => {
        expect(result.length).toBeGreaterThan(0);
    });
    test('verifier que le resultat est un tableau', async () => {
        expect(Array.isArray(result)).toBe(true);
    });
    test('le type de la variable doit etre un objet', async () => {
        expect(typeof result[0]).toBe('object');
    });
});

// getArmeById,
