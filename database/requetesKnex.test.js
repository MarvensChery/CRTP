const { TestWatcher } = require('jest');

const reqKnexArme = require('./armes');
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
