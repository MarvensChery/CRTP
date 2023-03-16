const dal = require('./valeurs');

test('Afficher les informations sur les objets de valeurs', async () => {
    const rows = await dal.getValeursAll();
    expect(rows).toEqual([
        {
            "IdIBVA": 5,
            "Identifiant": "628181-4249-96708",
            "Auteur": "MASTERCARD",
            "TypeValeur": "Carte de crédit / débit",
            "TypeEvenement": "Perdu",
            "NoEvenement": "123-220301-0007"
        },
        {
            "IdIBVA": 6,
            "Identifiant": "Bsc230087",
            "Auteur": "Banque canada",
            "TypeValeur": "Devise",
            "TypeEvenement": "Volé",
            "NoEvenement": "108-220303-0011"
        },
        {
            "IdIBVA": 7,
            "Identifiant": "ROMANTIQUE OUTREMONT",
            "Auteur": "RICHARD SAVOIE",
            "TypeValeur": "Œuvre d'art",
            "TypeEvenement": "Volé",
            "NoEvenement": "302-220305-0014"
        },
        {
            "IdIBVA": 8,
            "Identifiant": "GC872783",
            "Auteur": "CANADA",
            "TypeValeur": "Passeport",
            "TypeEvenement": "Perdu",
            "NoEvenement": "123-220307-0028"
        }
    ]);
});

test('Afficher les informations sur un objet de valeur', async () => {
    const rows = await dal.getValeurById(5);
    expect(rows).toEqual([
        {
            "IdIBVA": 5,
            "Identifiant": "628181-4249-96708",
            "Auteur": "MASTERCARD",
            "TypeValeur": "Carte de crédit / débit",
            "TypeEvenement": "Perdu",
            "NoEvenement": "123-220301-0007"
        }
    ]);
});