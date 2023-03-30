const { getIPPE } = require('./ippes');
const { getArmesAll, getArmeById } = require('./armes');
const { getIppePersonne } = require('./personnes');

// test Vérifie la fonction getIPPE
describe('getippe()', () => {
    let ippe;
    beforeEach(async () => { ippe = await getIPPE(8); });
    it('devrait avoir la propriété ippe sur le premier objet de la liste', async () => {
        expect(ippe[0]).toHaveProperty('IdIPPE');
    });
    it('devrait retourner un objet', async () => {
        expect(typeof ippe[0]).toBe('object');
    });
});

// getIppePersonne,
describe('getIppePersonne()', () => {
    let personne;
    beforeEach(async () => { personne = await getIppePersonne(3); });
    it('devrait avoir la propriété IdIPPE sur le premier objet de la liste', async () => {
        expect(personne[0]).toHaveProperty('IdIPPE');
    });
    it('devrait retourner une liste qui n\'est pas vide', async () => {
        expect(personne.length).toBeGreaterThan(0);
    });
    it('devrait retourner un tableau', async () => {
        expect(Array.isArray(personne)).toBe(true);
    });
    it('devrait retourner une liste d\'objet', async () => {
        expect(typeof personne[0]).toBe('object');
    });
});
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
describe('getArmeId()', () => {
    let armesId;
    beforeEach(async () => { armesId = await getArmeById(1); });
    it('devrait avoir la propriété IdIBAF sur le premier objet de la liste', async () => {
        expect(armesId).toHaveProperty('IdIBAF');
    });
    it('devrait retourner un objet', async () => {
        expect(typeof armesId).toBe('object');
    });
});
