// const { TestWatcher } = require('jest');
const reqUtilisateurs = require('./utilisateurs');
const reqKnexArme = require('./armes');
const reqKnexObjet = require('./objets');
const reqKnexValeur = require('./valeurs');











test('test1', async () => {
    await reqKnexArme.postArme('Test', 'Test', '3571      ', 'Test', '108-220304-0002');
    const expectedResult = [{
        IdIBAF: 5,
        NoSerie: 'test',
        Marque: 'test',
        Calibre: '3571      ',
        TypeArme: 'test',
        NoEvenement: '108-220304-0002',
    }];

    const result = await reqKnexArme.getArmeById();

    expect(expectedResult).toEqual(result);
});

test('get IBAF by id dans database', async () => {
    const expectedResult = [{
        NoSerie: '1597538',
        Marque: 'SMITH & WESSON',
        Calibre: '357       ',
        TypeArme: 'Révolver',
        NoEvenement: '108-220304-0006',
    }];
    const result = await reqKnexArme.getIBAFById(1);
    expect(expectedResult).toEqual(result);
});
// Ajout des armes
test('ajoutIBAF dans database', async () => {
    await reqKnexArme.postArme('test10', 'test8', '3751', 'test8', '108-220304-0003');
    const armes = await reqKnexArme.getArmesAll();
    const idarmes = (armes.length + 2);
    const armess = await reqKnexArme.getArmeById(idarmes);
    const result = (armess);
    console.log(result);
    const expectedResult = [{
        IdIBAF: idarmes,
        NoSerie: 'test10',
        Marque: 'test8',
        Calibre: '3751      ',
        TypeArme: 'test8',
        NoEvenement: '108-220304-0003',
    }];
    console.log(expectedResult);
    console.log(armes.length);
    console.log(idarmes);
    expect(expectedResult).toEqual(result);
    await reqKnexArme.deleteArme(idarmes);
});
// modif des Armes
test('modifIBAF dans database', async () => {
    const data = [{
        NoSerie: 'gogogaga',
        Marque: 'test8',
        Calibre: '3751      ',
        TypeArme: 'test8',
        NoEvenement: '108-220304-0003',
    }];
    console.log(data);
    await reqKnexArme.updateArme(data[0], 61);
    const expectedResult = [{
        NoSerie: 'gogogaga',
        Marque: 'test8',
        Calibre: '3751      ',
        TypeArme: 'test8',
        NoEvenement: '108-220304-0003',
    }];
    expect(expectedResult).toEqual(data);
});

test('modificationIBVA dans database', async () => {
    await reqKnexValeur.ajoutIBVA('Test', 'Tes', 'Tes', 'Tes', '123456789123456');
    const IBVA = await reqKnexValeur.getIBVAbyIdentifiant('Test');
    const idIBVA = IBVA[0].IdIBVA;
    await reqKnexValeur.modificationIBVA(idIBVA, 'Test', 'Test', 'Test', 'Test', '123456789123457');
    const expectedResult = [{
        Identifiant: 'Test',
        Auteur: 'Test',
        TypeValeur: 'Test',
        TypeEvenement: 'Test',
        NoEvenement: '123456789123457',

    }];
    const result = await reqKnexValeur.getIBVAbyId(idIBVA);
    await reqKnexValeur.suppresionIBVAById(idIBVA);
    expect(expectedResult).toEqual(result);
});

test('ajoutIBOB dans database', async () => {
    await reqKnexObjet.ajoutIBOB('Testt', 'Testt', 'Testt', 'Testt', '123456789123456');
    const expectedResult = [{
        NoSerie: 'Testt',
        Marque: 'Testt',
        Modele: 'Testt',
        TypeObjet: 'Testt',
        NoEvenement: '123456789123456',
    }];
    const IBOB = await reqKnexObjet.getIBOBbyNoSerie('Testt');
    const idIBOB = IBOB[0].IdBOB;
    const result = await reqKnexObjet.getIBOBbyId(idIBOB);
    await reqKnexObjet.suppresionIBOById(idIBOB);
    expect(expectedResult).toEqual(result);
});

test('modificationIBOB dans database', async () => {
    await reqKnexObjet.ajoutIBOB('Test', 'Tes', 'Tes', 'Tes', '123456789123456');
    const IBOB = await reqKnexObjet.getIBOBbyNoSerie('Test');
    const idIBOB = IBOB[0].IdBOB;
    await reqKnexObjet.modificationIBOB(idIBOB, 'Test', 'Test', 'Test', 'Test', '123456789123457');
    const expectedResult = [{
        NoSerie: 'Test',
        Marque: 'Test',
        Modele: 'Test',
        TypeObjet: 'Test',
        NoEvenement: '123456789123457',

    }];
    const result = await reqKnexObjet.getIBOBbyId(idIBOB);
    await reqKnexObjet.suppresionIBOById(idIBOB);
    expect(expectedResult).toEqual(result);
});

test('get Armeid', async () => {
    const expectedResult = {
        Calibre: '357       ',
        IdIBAF: 1,
        Marque: 'SMITH & WESSON',
        NoEvenement: '108-220304-0006',
        NoSerie: '1597538',
        TypeArme: 'Révolver',
    };
    const result = await reqKnexArme.getArmeById(1);

    expect(expectedResult).toEqual(result[0]);
});

test('get Armeid avec erreur', async () => {
    const result = await reqKnexArme.getArmeById(88);

    expect(result).toEqual([]);
    expect(result[0]).toBeUndefined();
});

test('get Armeall', async () => {
    const expectedResult = [
        {
            IdIBAF: 1,
            NoSerie: '1597538',
            Marque: 'SMITH & WESSON',
            Calibre: '357       ',
            TypeArme: 'Révolver',
            NoEvenement: '108-220304-0006',
        },
        {
            IdIBAF: 2,
            NoSerie: '1397139',
            Marque: 'BERETTA',
            Calibre: '9         ',
            TypeArme: 'Pistolet',
            NoEvenement: '302-220306-0009',
        },
        {
            IdIBAF: 3,
            NoSerie: '3572586',
            Marque: 'WINCHESTER',
            Calibre: '223       ',
            TypeArme: 'Carabine',
            NoEvenement: '123-220308-0023',
        },
        {
            IdIBAF: 4,
            NoSerie: '5462885',
            Marque: 'REMINGTON',
            Calibre: '12        ',
            TypeArme: 'Fusil',
            NoEvenement: '108-220310-0003',
        },
    ];
    const result = await reqKnexArme.getArmesAll();
    console.log(result);
    expect(expectedResult).toEqual(result);
});

test('GET /utilisateurs', async () => {
    const expected = [
        {
            IdUtilisateur: 1,
            Identifiant: 'e1234567',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'EtudiantAganier',
        },
        {
            IdUtilisateur: 2,
            Identifiant: '1234',
            MotDePasse: 'bonjour',
            Etudiant: false,
            NomFamille: 'ProfLamarre',
        },
        {
            IdUtilisateur: 4,
            Identifiant: 'e1236443',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Masse',
        },
        {
            IdUtilisateur: 5,
            Identifiant: 'e1235341',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Busseau',
        },
        {
            IdUtilisateur: 6,
            Identifiant: 'e1231880',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Vaillancourt',
        },
        {
            IdUtilisateur: 7,
            Identifiant: 'e1237247',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Talbot',
        },
        {
            IdUtilisateur: 8,
            Identifiant: 'e1239547',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Lafleur',
        },
        {
            IdUtilisateur: 9,
            Identifiant: 'e1233306',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Wilson',
        },
        {
            IdUtilisateur: 10,
            Identifiant: 'e1234634',
            MotDePasse: 'bonjour',
            Etudiant: true,
            NomFamille: 'Gagnon',
        },
    ];
    const rep = await reqUtilisateurs.getUtilisateursAll();
    console.log(rep);
    expect(rep).toEqual(expected);
    expect(rep.length).toEqual(9);
    expect(rep).toBeDefined();
});

test('GET /utilisateurs/{idUtilisateur}', async () => {
    const rep = await reqUtilisateurs.getUtilisateurById(1);
    const expected = {
        IdUtilisateur: 1,
        Identifiant: 'e1234567',
        MotDePasse: 'bonjour',
        Etudiant: true,
        NomFamille: 'EtudiantAganier',
    };
    console.log(rep);
    expect(rep[0]).toEqual(expected);
    expect(rep[0]).toBeDefined();
    expect(rep.length).toEqual(1);
});

//
test('GET /utilisateurs/{idUtilisateur} avec erreur', async () => {
    const rep = await reqUtilisateurs.getUtilisateurById(88);
    expect(rep).toEqual([]);
    expect(rep[0]).toBeUndefined();
    expect(rep.length).toEqual(0);
});
