const requetesKnex = require('./requetesKnex.js')

test('test ippe', async () => {
    const resultat = [
    {
      Id: 9,
      IdIPPE: 5,
      Libelle: "Avoir comme adresse le"
    },
    {
      Id: 10,
      IdIPPE: 5,
      Libelle: "Ne pas fréquenter des gens ayant des dossiers criminels"
    },
    {
      Id: 11,
      IdIPPE: 5,
      Libelle: "Aucune consommation dalcool ou de drogue non prescrite"
    },
    {
      Id: 12,
      IdIPPE: 5,
      Libelle: "Doit garder la paix et avoir bonne conduite"
    }
  ];
  const ippe = await requetesKnex.getCondition(resultat[0].IdIPPE);

  expect(ippe).toEqual(resultat);

  });
