const requetesKnex = require('./requetesKnex.js')

test('test personnes', async () => {
    const resultat = [{
        Id: 2,
        IdPersonne: 3,
        NoEvenement: '108-220208-0031',
        TypeEvenement: 'recherché',
        Raison: 'Arrestation',
        DossierEnquete: null,
        Cour: 'Municipale de Longueuil',
        NoMandat: 'CM-LGL-A-26840',
        NatureCrime: 'Agression armée',
        LieuDetention: null,
        FinSentence: null,
        VuDerniereFois: null,
        Agent: null,
        Telephone: null,
        Poste: null
      }];
    const ippe = await requetesKnex.getIPPE(resultat[0].IdPersonne);

    expect(ippe).toEqual(resultat);

    });