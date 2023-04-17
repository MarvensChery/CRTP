const reqUtilisateurs = require('./utilisateurs');
const reqKnexArme = require('./armes');

// test('test1', async () => {
//  await reqKnexArme.postArme('Test', 'Test', '3571      ', 'Test', '108-220304-0002');
//  const expectedResult = [{
//     IdIBAF: 5,
//      NoSerie: "test",
//     Marque: "test",
//     Calibre: '3571      ',
//     TypeArme: "test",
//     NoEvenement: '108-220304-0002',
// }];

// const result = await reqKnexArme.getArmeById();

//  expect(expectedResult).toEqual(result);
// });// Ajout des armes
// test('ajoutIBAF dans database', async () => {
//    await reqKnexArme.postArme('test10', 'test8', '3751', 'test8', '108-220304-0003');
//   const armes = await reqKnexArme.getArmesAll();
//   const idarmes = (armes.length + 2);
//   const armess = await reqKnexArme.getArmeById(idarmes);
//   const result = (armess);
//  console.log(result);
//   const expectedResult = [{
//      IdIBAF: idarmes,
//    NoSerie: 'test10',
//   Marque: 'test8',
//   Calibre: '3751      ',
//    TypeArme: 'test8',
//     NoEvenement: '108-220304-0003',
//   }];
//   console.log(expectedResult);
///    console.log(armes.length);
//   console.log(idarmes);
//   expect(expectedResult).toEqual(result);
//  await reqKnexArme.deleteArme(idarmes);
// });
// modif des Armes
// test('modifIBAF dans database', async () => {
//   const data = [{
//       NoSerie: 'gogogaga',
//      Marque: 'test8',
//      Calibre: '3751      ',
//      TypeArme: 'test8',
//      NoEvenement: '108-220304-0003',
//   }];
//  console.log(data);
// await reqKnexArme.updateArme(data[0], 61);
// const expectedResult = [{
//    NoSerie: 'gogogaga',
//    Marque: 'test8',
//     Calibre: '3751      ',
//    TypeArme: 'test8',
//      NoEvenement: '108-220304-0003',
//  }];
//  expect(expectedResult).toEqual(data);
// });

test('get Armeid', async () => {
    const expectedResult = {
        Calibre: '357',
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
            Calibre: '357',
            TypeArme: 'Révolver',
            NoEvenement: '108-220304-0006',
        },
        {
            IdIBAF: 2,
            NoSerie: '1397139',
            Marque: 'BERETTA',
            Calibre: '9',
            TypeArme: 'Pistolet',
            NoEvenement: '302-220306-0009',
        },
        {
            IdIBAF: 3,
            NoSerie: '3572583',
            Marque: 'Winchester',
            Calibre: '223',
            TypeArme: 'Carabine',
            NoEvenement: '123-220308-0023',
        },
        {
            IdIBAF: 4,
            NoSerie: '5462885',
            Marque: 'REMINGTON',
            Calibre: '12',
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
            Identifiant: 'e1233772',
            MotDePasse: '$2b$10$dkVjYiaYLKCDq7ZeQvIgduxdpnLPA5F6iCP6tFZRilFTD15we4V7S',
            Etudiant: true,
            IdPersonne: 8,
        },
        {
            IdUtilisateur: 2,
            Identifiant: 'e1233152',
            MotDePasse: '$2b$10$zrGaWRacw7NuEVb2Llqy..E6/GUSDfskWxxiyGc0VMho85kai6nf6',
            Etudiant: true,
            IdPersonne: 10,
        },
        {
            IdUtilisateur: 11,
            Identifiant: '2248',
            MotDePasse: '$2b$10$M6ghr8MOf2I1wm5FB.J3QupD6uxXHgPqamv3GQxkQVZtB67bzg3fu',
            Etudiant: false,
            IdPersonne: 1,
        },
    ];
    const rep = await reqUtilisateurs.getUtilisateursAll();
    console.log(rep);
    expect(rep).toEqual(expected);
    expect(rep.length).toEqual(3);
    expect(rep).toBeDefined();
});

test('GET /utilisateurs/{idUtilisateur}', async () => {
    const rep = await reqUtilisateurs.getUtilisateurById(1);
    const expected = {
        IdUtilisateur: 1,
        Identifiant: 'e1233772',
        MotDePasse: '$2b$10$dkVjYiaYLKCDq7ZeQvIgduxdpnLPA5F6iCP6tFZRilFTD15we4V7S',
        Etudiant: true,
        IdPersonne: 8,
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
