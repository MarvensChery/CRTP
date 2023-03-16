const dal = require('./conditions');

test('Afficher les informations d\'une condition', async () => {
    const rows = await dal.returnCondition(3);
    expect(rows).toEqual([
        {
            "IdCondition": 3,
            "IdIPPE": 12,
            "IdPersonne": null,
            "Libelle": "Ne pas entrer en contact avec ",
            "HeureDebut": null,
            "HeureFin": null,
            "Victime": "Julie Lapierre",
            "Frequentation": null
        }
    ]);
});

test('Afficher les conditions d\'un evenement', async () => {
    const rows = await dal.returnConditionsOfEvenement(12);
    expect(rows).toEqual([
        {
            "IdCondition": 2,
            "IdIPPE": 12,
            "IdPersonne": 5,
            "Libelle": "Avoir comme adresse le\r\n ",
            "HeureDebut": null,
            "HeureFin": null,
            "Victime": null,
            "Frequentation": null
        },
        {
            "IdCondition": 3,
            "IdIPPE": 12,
            "IdPersonne": null,
            "Libelle": "Ne pas entrer en contact avec ",
            "HeureDebut": null,
            "HeureFin": null,
            "Victime": "Julie Lapierre",
            "Frequentation": null
        },
        {
            "IdCondition": 4,
            "IdIPPE": 12,
            "IdPersonne": null,
            "Libelle": "Doit garder la paix et avoir bonne conduite",
            "HeureDebut": null,
            "HeureFin": null,
            "Victime": null,
            "Frequentation": null
        }
    ]);
});