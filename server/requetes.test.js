const requetesKnex = require('./requetesKnex.js')

test('test ippe', async () => {
    const resultat = [{
        Adresse1: null,
        Adresse2: null, 
        AutreVetement: null, 
        Cheveux: null, 
        CodePostal: null, 
        DateNaissance: new Date('1975-08-31'), 
        Depressif: null, 
        Desorganise: null, 
        Gilet: null, 
        Id: 3, 
        Marques: null, 
        Masculin: true, 
        NoPermis: null, 
        NomFamille: "Ducharne", 
        Pantalon: null, 
        Poids: null, 
        Prenom1: "Benoit", 
        Prenom2: null, 
        Province: null, 
        Race: null, 
        Suicidaire: null, 
        Taille: null, 
        Telephone: null, 
        Toxicomanie: null, 
        Ville: null, 
        Violent: null, 
        Yeux: null
    }];
    const ippe = await requetesKnex.getPersonne(resultat[0].NomFamille, resultat[0].Prenom1, resultat[0].Prenom2, resultat[0].Masculin, resultat[0].DateNaissance);

    expect(ippe).toEqual(resultat);

    });
