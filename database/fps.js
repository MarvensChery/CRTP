const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

function getFps(IdFPS) {
    return knex('FPS')
        .select(
            'Personnes.IdPersonne',
            'FPS.IdFPS',
            'FPS.NoFPS',
            'FPS.CD',
            'Personnes.Race',
            'Personnes.Taille',
            'Personnes.Poids',
            'Personnes.Yeux',
            'Personnes.Marques',
            'FPS.Violent',
            'FPS.Echappe',
            'FPS.Suicidaire',
            'FPS.Desequilibre',
            'FPS.Contagieux',
            'FPS.Violence',
            'FPS.Fraude',
            'FPS.Vol',
            'FPS.ConduiteVehicule',
            'FPS.IntroEffraction',
            'FPS.Sexe',
            'FPS.ArmeOffensive',
            'FPS.Drogue',
            'FPS.Mefait',
            'FPS.Incendie',
            'FPS.AutreInfraction',
        )
        .fullOuterJoin('Personnes', 'Personnes.IdPersonne', '=', 'FPS.IdPersonne')
        .where({ 'FPS.IdFPS': IdFPS });
}

function addFps(
    IdPersonne,
    NoFPS,
    Violent,
    CD,
    Echappe,
    Suicidaire,
    Desequilibre,
    Contagieux,
    Violence,
    Fraude,
    ConduiteVehicule,
    IntroEffraction,
    Sexe,
    ArmeOffensive,
    Vol,
    Drogue,
    Mefait,
    Incendie,
    AutreInfraction,
) {
    return knex('FPS')
        .insert({
            IdPersonne,
            NoFPS,
            CD,
            Violent,
            Echappe,
            Suicidaire,
            Desequilibre,
            Contagieux,
            Violence,
            Fraude,
            ConduiteVehicule,
            IntroEffraction,
            Sexe,
            ArmeOffensive,
            Vol,
            Drogue,
            Mefait,
            Incendie,
            AutreInfraction,
        });
}

function updateDescription(
    IdPersonne,
    Race,
    Taille,
    Poids,
    Yeux,
    Marques,
) {
    return knex('Personnes')
        .update({
            Race,
            Taille,
            Poids,
            Yeux,
            Marques,
        })
        .where({ IdPersonne });
}

function updateFps(
    IdFPS,
    IdPersonne,
    NoFPS,
    Violent,
    CD,
    Echappe,
    Suicidaire,
    Desequilibre,
    Contagieux,
    Violence,
    Fraude,
    ConduiteVehicule,
    IntroEffraction,
    Sexe,
    ArmeOffensive,
    Vol,
    Drogue,
    Mefait,
    Incendie,
    AutreInfraction,
) {
    return knex('FPS')
        .update({
            NoFPS,
            CD,
            Violent,
            Echappe,
            Suicidaire,
            Desequilibre,
            Contagieux,
            Violence,
            Fraude,
            ConduiteVehicule,
            IntroEffraction,
            Sexe,
            ArmeOffensive,
            Vol,
            Drogue,
            Mefait,
            Incendie,
            AutreInfraction,
        })
        .where({ IdFPS, IdPersonne });
}

function deleteFps(IdFPS) {
    return knex('FPS').where({ IdFPS }).del();
}

function getFPSAll() {
    return knex('FPS');
}

module.exports = {
    getFps,
    addFps,
    getFPSAll,
    updateDescription,
    updateFps,
    deleteFps,
};
