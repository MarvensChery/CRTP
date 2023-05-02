const { getArmesAll, getArmeById } = require('./armes');

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

// verifier la fonction getArmeid
describe('getArmeById()', () => {
    let armesId;
    beforeEach(async () => { armesId = await getArmeById(1); });
    it('devrait avoir la propriété IdIBAF sur le premier objet de la liste', async () => {
        expect(armesId).toHaveProperty('IdIBAF');
    });
    it('devrait retourner un objet', async () => {
        expect(typeof armesId).toBe('object');
    });
});
