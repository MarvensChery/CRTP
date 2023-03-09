const { TestWatcher } = require('jest');
const reqKnex = require('./ippes');
const reqKnexArme = require('./armes');
const reqKnexObjet = require('./objets');
const reqKnexValeur = require('./valeurs');


test('test1', async () => {
    await reqKnexArme.postArme('Test', 'Test', '3571      ', 'Test', '108-220304-0002');
    const expectedResult = [{
        IdIBAF: 5,
        NoSerie: "test",
        Marque: "test",
        Calibre: '3571      ',
        TypeArme: "test",
        NoEvenement: '108-220304-0002',
    }];
    
    const result = await reqKnexArme.getArmeById();
    
    expect(expectedResult).toEqual(result);
});

