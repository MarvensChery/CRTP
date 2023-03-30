const reqKnex = require('./ippes');
const { getArmesAll, getArmeById } = require('./armes');

// test Vérifie la fonction getIPPE
test('get Ippe by id dans database', async () => {
    const expectedResult = await reqKnex.getIPPE(8);
    expect(expectedResult.length).toEqual(1);
});

// getIppePersonne,

// verifier la fonction getArmeAll
describe('getArmesAll()', () => {
    let armes;
    beforeEach(async () => { armes = await getArmesAll(); });
    it('devrait avoir la propriété IdIBAF sur le premier objet de la liste', async () => {
        expect(armes[0]).toHaveProperty('IdIBAF');
    });
    it('devrait retourner une liste qui n\'est pas vide', async () => {
        expect(armes.length).toBeGreaterThan(0);
    });
    it('devrait retourner un tableau', async () => {
        expect(Array.isArray(armes)).toBe(true);
    });
    it('devrait retourner une liste d\'objet', async () => {
        expect(typeof armes[0]).toBe('object');
    });
});
// getArmeById,

