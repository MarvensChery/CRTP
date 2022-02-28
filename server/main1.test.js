const requetesKnex = require('./requetesKnex.js')

test('test ippe', async () => {
    const resultat = [{
        Id: 10,
        NomFamille: "Amoussougbo",
        Prenom1: "Yaken",
        Prenom2: null,
        Masculin: true,
        DateNaissance: new Date('2000-03-14'),
        Telephone: null,
        NoPermis: null,
        Adresse1: null,
        Adresse2: null,
        Ville: null,
        Province: null,
        CodePostal: "H1X2A2 ",
        Race: "Noir",
        Taille: 175,
        Poids: 75,
        Yeux: "Noir",
        Cheveux: "Noir",
        Marques: null,
        Toxicomanie: null,
        Desorganise: null,
        Depressif: true,
        Suicidaire: null,
        Violent: null,
        Gilet: "T-shirt vert",
        Pantalon: "Jeans bleu",
        AutreVetement: "Espadrille fluo"
      }];
    const ippe = await requetesKnex.getPersonne(resultat[0].NomFamille, resultat[0].Prenom1, resultat[0].Prenom2, resultat[0].Masculin, resultat[0].DateNaissance);

    expect(ippe).toEqual(resultat);

    });
