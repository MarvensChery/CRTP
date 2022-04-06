const reqKnex = require('./requetesKnex');

test('Réponse ***RECHERCHÉ***', async () => {
    const resultat = [{
        IdPersonne: 6,
        TypePersonne: 'Enseignant',
        NomFamille: 'Levasseur',
        Prenom1: 'Marc',
        Prenom2: null,
        Masculin: true,
        DateNaissance: new Date('1971-11-07'),
        Telephone: null,
        NoPermis: null,
        Adresse1: '3800 rue Sherbrooke Est',
        Adresse2: null,
        Ville: 'Montréal',
        Province: 'Qc',
        CodePostal: 'H1X 2A2',
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
        FPS: null,
        IPPE: [
            {
                idIPPE: 18,
                noEvenement: '123-200303-0026',
                typeEvenement: 'Probation',
                mandat: null,
                motif: null,
                nature: 'Intimidation',
                cour: 'Municipale de Montréal',
                noMandat: null,
                noCause: 'CM-MTL-58246-829',
                lieuDetention: null,
                finSentence: new Date('2022-03-01'),
                vuDerniereFois: null,
                idNatureCrime: undefined,
                dossierEnquete: null,
                conditions: [
                    {
                        idCondition: 12,
                        libelle: 'Avoir comme adresse le ',
                        frequentation: null,
                        heureDebut: null,
                        heureFin: null,
                        victime: null,
                    },
                    {
                        idCondition: 13,
                        libelle: 'Ne pas entrer en contact avec ',
                        frequentation: null,
                        heureDebut: null,
                        heureFin: null,
                        victime: 'Alain Coutu',
                    },
                    {
                        idCondition: 14,
                        libelle: "Aucune consommation d'alcool ou de drogue non prescrite",
                        frequentation: null,
                        heureDebut: null,
                        heureFin: null,
                        victime: null,
                    },
                    {
                        idCondition: 15,
                        libelle: 'Doit garder la paix et avoir bonne conduite',
                        frequentation: null,
                        heureDebut: null,
                        heureFin: null,
                        victime: null,
                    },
                ],
                agentProbation: 'David Chapdelaine\n',
                agentLiberation: null,
                telephone: '5142547131',
                poste: '222\n',
            },
        ],
    }];
    const ippe = await reqKnex.getIPPE(
        resultat[0].NomFamille,
        resultat[0].Prenom1,
        resultat[0].Prenom2,
        resultat[0].Masculin,
        resultat[0].DateNaissance,
    );

    console.log(ippe);
    console.log(resultat);

    expect(ippe).toEqual(resultat);
});
