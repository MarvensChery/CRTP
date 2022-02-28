const requetesKnex = require('./requetesKnex')
test('Réponse ***RECHERCHÉ***', async () => {

    const resultat = [{
        Id: 3,
        NomFamille: 'Ducharne',
        Prenom1: 'Benoit',
        Prenom2: null,
        Masculin: true,
        DateNaissance: new Date('1975-08-31T00:00:00.000Z'),
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
        AutreVetement: null
    }];
      const ippe = await requetesKnex.getPersonne(resultat[0].NomFamille, resultat[0].Prenom1, resultat[0].Prenom2, resultat[0].Masculin, resultat[0].DateNaissance);
    
      expect(ippe).toEqual(resultat);
    
    });