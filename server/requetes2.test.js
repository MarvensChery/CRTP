const requetesKnex = require('./requetesKnex.js')

test('test 2 IPPE accuse/interdit', async () => {
    const resultat = [{
        Id: 9,
        IdPersonne: 13,
        NoEvenement: '123-220115-0015',
        TypeEvenement: 'accusé',
        Raison: null,
        DossierEnquete: null,
        Cour: 'Cour du Québec',
        NoMandat: '500-01-310-25846-159',
        NatureCrime: 'Agression armée',
        LieuDetention: null,
        FinSentence: null,
        VuDerniereFois: null,
        Agent: null,
        Telephone: null,
        Poste: null
      },
      {
        Id: 10,
        IdPersonne: 13,
        NoEvenement: '108-200207-0022',
        TypeEvenement: 'interdit',
        Raison: null,
        DossierEnquete: null,
        Cour: 'Cour du Québec',
        NoMandat: '500-01-310-23654-846',
        NatureCrime: 'Vol qualifié',
        LieuDetention: null,
        FinSentence: new Date('2031-10-29'),
        VuDerniereFois: null,
        Agent: null,
        Telephone: null,
        Poste: null
      }];
    const ippe = await requetesKnex.getIPPE(resultat[0].IdPersonne);

    expect(ippe).toEqual(resultat);

    });
