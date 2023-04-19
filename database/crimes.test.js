const dal = require('./crimes');

test('Afficher les informations sur tous les crimes', async () => {
    const rows = await dal.getCrimesAll();
    expect(rows).toEqual([
        {
            IdCrime: 1,
            IdCategorieCrime: 1,
            Nature: 'Meurtre',
        },
        {
            IdCrime: 2,
            IdCategorieCrime: 1,
            Nature: 'Homicide involontaire',
        },
        {
            IdCrime: 3,
            IdCategorieCrime: 1,
            Nature: 'Infanticide',
        },
        {
            IdCrime: 4,
            IdCategorieCrime: 1,
            Nature: 'Négligence criminelle entraînant la mort',
        },
        {
            IdCrime: 5,
            IdCategorieCrime: 1,
            Nature: 'Tentative de meurtre',
        },
        {
            IdCrime: 6,
            IdCategorieCrime: 1,
            Nature: 'Agression sexuelle',
        },
        {
            IdCrime: 7,
            IdCategorieCrime: 1,
            Nature: 'Contact sexuel',
        },
        {
            IdCrime: 8,
            IdCategorieCrime: 1,
            Nature: 'Exploitation sexuelle',
        },
        {
            IdCrime: 9,
            IdCategorieCrime: 1,
            Nature: 'Inceste',
        },
        {
            IdCrime: 10,
            IdCategorieCrime: 1,
            Nature: 'Pornographie juvénile',
        },
        {
            IdCrime: 11,
            IdCategorieCrime: 1,
            Nature: 'Leurre au moyen d’un ordinateur',
        },
        {
            IdCrime: 12,
            IdCategorieCrime: 1,
            Nature: 'Action indécente',
        },
        {
            IdCrime: 13,
            IdCategorieCrime: 1,
            Nature: 'Voie de fait grave',
        },
        {
            IdCrime: 14,
            IdCategorieCrime: 1,
            Nature: 'Agression armée ou infliction de lésions corporelles',
        },
        {
            IdCrime: 15,
            IdCategorieCrime: 1,
            Nature: 'Voie de fait armée',
        },
        {
            IdCrime: 16,
            IdCategorieCrime: 1,
            Nature: 'Voie de fait simple',
        },
        {
            IdCrime: 17,
            IdCategorieCrime: 1,
            Nature: 'Infliction illégale de lésions corporelles',
        },
        {
            IdCrime: 18,
            IdCategorieCrime: 1,
            Nature: 'Décharger une arme à feu avec intention',
        },
        {
            IdCrime: 19,
            IdCategorieCrime: 1,
            Nature: 'Braquer une arme à feu',
        },
        {
            IdCrime: 20,
            IdCategorieCrime: 1,
            Nature: 'Négligence criminelle entraînant des lésions corporelles',
        },
        {
            IdCrime: 21,
            IdCategorieCrime: 1,
            Nature: 'Enlèvement',
        },
        {
            IdCrime: 22,
            IdCategorieCrime: 1,
            Nature: 'Séquestration',
        },
        {
            IdCrime: 23,
            IdCategorieCrime: 1,
            Nature: 'Traite de personne',
        },
        {
            IdCrime: 24,
            IdCategorieCrime: 1,
            Nature: 'Enlèvement en contravention d’une ordonnance de garde',
        },
        {
            IdCrime: 25,
            IdCategorieCrime: 1,
            Nature: 'Vol qualifié sur une personne',
        },
        {
            IdCrime: 26,
            IdCategorieCrime: 1,
            Nature: 'Vol qualifié dans un commerce',
        },
        {
            IdCrime: 27,
            IdCategorieCrime: 1,
            Nature: 'Vol qualifié dans une institution financière',
        },
        {
            IdCrime: 28,
            IdCategorieCrime: 1,
            Nature: 'Vol qualifié de véhicule',
        },
        {
            IdCrime: 29,
            IdCategorieCrime: 1,
            Nature: 'Vol qualifié de sac à main',
        },
        {
            IdCrime: 30,
            IdCategorieCrime: 1,
            Nature: 'Autre vol qualifié',
        },
        {
            IdCrime: 31,
            IdCategorieCrime: 1,
            Nature: 'Extorsion - personne',
        },
        {
            IdCrime: 32,
            IdCategorieCrime: 1,
            Nature: 'Harcèlement criminel',
        },
        {
            IdCrime: 33,
            IdCategorieCrime: 1,
            Nature: 'Appels téléphoniques indécents, harassants',
        },
        {
            IdCrime: 34,
            IdCategorieCrime: 1,
            Nature: 'Proférer des menaces',
        },
        {
            IdCrime: 35,
            IdCategorieCrime: 1,
            Nature: 'Incendie/insouciance de vie',
        },
        {
            IdCrime: 36,
            IdCategorieCrime: 1,
            Nature: 'Intimidation générale',
        },
        {
            IdCrime: 37,
            IdCategorieCrime: 2,
            Nature: "Crime d'incendie",
        },
        {
            IdCrime: 38,
            IdCategorieCrime: 2,
            Nature: 'Intro./effrac. dans résidence privée',
        },
        {
            IdCrime: 39,
            IdCategorieCrime: 2,
            Nature: 'Intro./effrac. dans établissement commercial',
        },
        {
            IdCrime: 40,
            IdCategorieCrime: 2,
            Nature: 'Vol de + 5 000 $, dans/sur véhicule',
        },
        {
            IdCrime: 41,
            IdCategorieCrime: 2,
            Nature: 'Vol de + 5 000 $, sac à main',
        },
        {
            IdCrime: 42,
            IdCategorieCrime: 2,
            Nature: 'Vol de + 5 000 $, à la tire',
        },
        {
            IdCrime: 43,
            IdCategorieCrime: 2,
            Nature: 'Vol de + 5 000 $, à l’étalage',
        },
        {
            IdCrime: 44,
            IdCategorieCrime: 2,
            Nature: 'Vol de + 5 000 $, bicyclette',
        },
        {
            IdCrime: 45,
            IdCategorieCrime: 2,
            Nature: 'Autre vol de + 5 000 $',
        },
        {
            IdCrime: 46,
            IdCategorieCrime: 2,
            Nature: 'Vol de véhicule',
        },
        {
            IdCrime: 47,
            IdCategorieCrime: 2,
            Nature: 'Vol de 5 000 $ et moins, dans /sur véhicule',
        },
        {
            IdCrime: 48,
            IdCategorieCrime: 2,
            Nature: 'Vol de 5 000 $ et moins, sac à main',
        },
        {
            IdCrime: 49,
            IdCategorieCrime: 2,
            Nature: 'Vol de 5 000 $ et moins, à la tire',
        },
        {
            IdCrime: 50,
            IdCategorieCrime: 2,
            Nature: 'Vol de 5 000 $ et moins, à l’étalage',
        },
        {
            IdCrime: 51,
            IdCategorieCrime: 2,
            Nature: 'Vol de 5 000 $ et moins, bicyclette',
        },
        {
            IdCrime: 52,
            IdCategorieCrime: 2,
            Nature: 'Autre vol de 5 000 $ et moins',
        },
        {
            IdCrime: 53,
            IdCategorieCrime: 2,
            Nature: 'Recel de + de 5 000 $',
        },
        {
            IdCrime: 54,
            IdCategorieCrime: 2,
            Nature: 'Recel de 5 000 $ et moins',
        },
        {
            IdCrime: 55,
            IdCategorieCrime: 3,
            Nature: 'Chèque',
        },
        {
            IdCrime: 56,
            IdCategorieCrime: 3,
            Nature: 'Guichet automatique',
        },
        {
            IdCrime: 57,
            IdCategorieCrime: 3,
            Nature: 'Supposition de personne',
        },
        {
            IdCrime: 58,
            IdCategorieCrime: 3,
            Nature: 'Télémarketing',
        },
        {
            IdCrime: 59,
            IdCategorieCrime: 3,
            Nature: 'Valeurs mobilières, instruments financiers',
        },
        {
            IdCrime: 60,
            IdCategorieCrime: 3,
            Nature: 'Par ordinateur',
        },
        {
            IdCrime: 61,
            IdCategorieCrime: 3,
            Nature: 'Vol d’identité',
        },
        {
            IdCrime: 62,
            IdCategorieCrime: 3,
            Nature: 'Infraction relative à la monnaie (reproduction, …)',
        },
        {
            IdCrime: 63,
            IdCategorieCrime: 3,
            Nature: 'Utilisation de monnaie contrefaite',
        },
        {
            IdCrime: 64,
            IdCategorieCrime: 3,
            Nature: 'Autres fraudes',
        },
        {
            IdCrime: 65,
            IdCategorieCrime: 3,
            Nature: 'Méfait : dom. matériels de + 5 000 $',
        },
        {
            IdCrime: 66,
            IdCategorieCrime: 3,
            Nature: 'Méfait : dommages matériels de 5 000 $ et moins',
        },
        {
            IdCrime: 67,
            IdCategorieCrime: 3,
            Nature: 'Méfait : + 5 000 $ sur véhicule',
        },
        {
            IdCrime: 68,
            IdCategorieCrime: 3,
            Nature: 'Méfait : 5 000 $ et moins sur véhicule',
        },
        {
            IdCrime: 69,
            IdCategorieCrime: 3,
            Nature: 'Méfait (graffiti) : + 5 000 $',
        },
        {
            IdCrime: 70,
            IdCategorieCrime: 3,
            Nature: 'Méfait (graffiti) : - 5 000 $',
        },
        {
            IdCrime: 71,
            IdCategorieCrime: 3,
            Nature: 'Biens de culte (religieux) de + de 5 000 $',
        },
        {
            IdCrime: 72,
            IdCategorieCrime: 3,
            Nature: 'Biens et culte (religieux) 5 000 $ et moins',
        },
        {
            IdCrime: 73,
            IdCategorieCrime: 4,
            Nature: 'Maison de débauche',
        },
        {
            IdCrime: 74,
            IdCategorieCrime: 4,
            Nature: 'Proxénétisme',
        },
        {
            IdCrime: 75,
            IdCategorieCrime: 4,
            Nature: 'Prostitution, moins de 18 ans - proxénétisme',
        },
        {
            IdCrime: 76,
            IdCategorieCrime: 4,
            Nature: 'Maison de paris',
        },
        {
            IdCrime: 77,
            IdCategorieCrime: 4,
            Nature: 'Maison de jeux',
        },
        {
            IdCrime: 78,
            IdCategorieCrime: 4,
            Nature: 'Loterie illégale',
        },
        {
            IdCrime: 79,
            IdCategorieCrime: 4,
            Nature: 'Arme à feu - Usage',
        },
        {
            IdCrime: 80,
            IdCategorieCrime: 4,
            Nature: 'Arme à feu - Trafic',
        },
        {
            IdCrime: 81,
            IdCategorieCrime: 4,
            Nature: 'Arme à feu - Possession',
        },
        {
            IdCrime: 82,
            IdCategorieCrime: 4,
            Nature: 'Arme à feu - Usage dangereux',
        },
        {
            IdCrime: 83,
            IdCategorieCrime: 4,
            Nature: 'Arme à feu - Entreposage non sécuritaire',
        },
        {
            IdCrime: 84,
            IdCategorieCrime: 4,
            Nature: 'Troubler la paix',
        },
        {
            IdCrime: 85,
            IdCategorieCrime: 4,
            Nature: 'Évasion d’une garde légale',
        },
        {
            IdCrime: 86,
            IdCategorieCrime: 4,
            Nature: 'Production / distribution de pornographie juvénile',
        },
        {
            IdCrime: 87,
            IdCategorieCrime: 4,
            Nature: 'Possession de pornographie juvénile',
        },
        {
            IdCrime: 88,
            IdCategorieCrime: 4,
            Nature: 'Nuire à un fonctionnaire public ou à un agent de la paix',
        },
        {
            IdCrime: 89,
            IdCategorieCrime: 4,
            Nature: 'Détenu en liberté illégale',
        },
        {
            IdCrime: 90,
            IdCategorieCrime: 4,
            Nature: 'Intrusion de nuit',
        },
        {
            IdCrime: 91,
            IdCategorieCrime: 4,
            Nature: 'Défaut de comparaître',
        },
        {
            IdCrime: 92,
            IdCategorieCrime: 4,
            Nature: 'Manquement aux conditions de la probation',
        },
        {
            IdCrime: 93,
            IdCategorieCrime: 4,
            Nature: 'Incitation publique à la haine',
        },
        {
            IdCrime: 94,
            IdCategorieCrime: 4,
            Nature: 'Terrorisme',
        },
        {
            IdCrime: 95,
            IdCategorieCrime: 4,
            Nature: 'Méfait public',
        },
        {
            IdCrime: 96,
            IdCategorieCrime: 4,
            Nature: 'Nuisance publique',
        },
        {
            IdCrime: 97,
            IdCategorieCrime: 4,
            Nature: 'Atteinte à la vie privée',
        },
        {
            IdCrime: 98,
            IdCategorieCrime: 4,
            Nature: 'Infraction contre la réputation et la personne',
        },
        {
            IdCrime: 99,
            IdCategorieCrime: 4,
            Nature: 'Cruauté envers un animal',
        },
        {
            IdCrime: 100,
            IdCategorieCrime: 4,
            Nature: 'Participation aux activités - organisation criminelle',
        },
        {
            IdCrime: 101,
            IdCategorieCrime: 4,
            Nature: 'Recyclage des produits de la criminalité',
        },
        {
            IdCrime: 102,
            IdCategorieCrime: 5,
            Nature: 'Possession',
        },
        {
            IdCrime: 103,
            IdCategorieCrime: 5,
            Nature: 'Possession en vue trafic',
        },
        {
            IdCrime: 104,
            IdCategorieCrime: 5,
            Nature: 'Trafic',
        },
        {
            IdCrime: 105,
            IdCategorieCrime: 5,
            Nature: 'Importation / Production',
        },
        {
            IdCrime: 106,
            IdCategorieCrime: 6,
            Nature: 'Conduite dangereuse de véhicule',
        },
        {
            IdCrime: 107,
            IdCategorieCrime: 6,
            Nature: 'Capacité de conduire affaiblie',
        },
        {
            IdCrime: 108,
            IdCategorieCrime: 6,
            Nature: 'Délit de fuite - Véhicule moteur',
        },
        {
            IdCrime: 109,
            IdCategorieCrime: 6,
            Nature: 'Course',
        },
    ]);
});

test('Afficher les informations sur un crime', async () => {
    const rows = await dal.getCrimeById(1);
    expect(rows).toEqual([
        {
            IdCrime: 1,
            IdCategorieCrime: 1,
            Nature: 'Meurtre',
        },
    ]);
});
