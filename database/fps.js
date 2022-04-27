const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

function getFps(IdFPS, IdPersonne) {
    return knex("FPS")
        .select('Personnes.IdPersonne', 'FPS.IdFPS', 'FPS.NoFPS', 'FPS.CD', 'Personnes.Race',
            'Personnes.Taille', 'Personnes.Poids', 'Personnes.Yeux', 'Personnes.Marques',
            'FPS.Violent', 'FPS.Echappe', 'FPS.Suicidaire', 'FPS.Desequilibre',
            'FPS.Contagieux', 'FPS.Violence', 'FPS.Fraude', 'FPS.Vol',
            'FPS.ConduiteVehicule', 'FPS.IntroEffraction', 'FPS.Sexe', 'FPS.ArmeOffensive',
            'FPS.Drogue', 'FPS.Mefait', 'FPS.Incendie', 'FPS.AutreInfraction')
        .fullOuterJoin("Personnes", "Personnes.IdPersonne", '=', "FPS.IdPersonne")
        .where({ 'FPS.IdFPS': IdFPS })
}

function addFps(IdPersonne, NoFPS, Violent, CD,
    Echappe, Suicidaire, Desequilibre,
    Contagieux, Violence, Fraude,
    ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
    Drogue, Mefait, Incendie, AutreInfraction) {
    return knex("FPS")
        .insert({
            'IdPersonne': IdPersonne, 'NoFPS': NoFPS, 'CD': CD, 'Violent': Violent,
            'Echappe': Echappe, 'Suicidaire': Suicidaire,
            'Desequilibre': Desequilibre, 'Contagieux': Contagieux,
            'Violence': Violence, 'Fraude': Fraude,
            'ConduiteVehicule': ConduiteVehicule, 'IntroEffraction': IntroEffraction,
            'Sexe': Sexe, 'ArmeOffensive': ArmeOffensive, 'Vol': Vol, 'Drogue': Drogue,
            'Mefait': Mefait, 'Incendie': Incendie, 'AutreInfraction': AutreInfraction
        })
}

function updateDescription(IdPersonne, Race, Taille, Poids,
    Yeux, Marques) {
    return knex("Personnes")
        .update({
            'Race': Race,
            'Taille': Taille, 'Poids': Poids, 'Yeux': Yeux, 'Marques': Marques
        })
        .where({ 'IdPersonne': IdPersonne })
}

function updateFps(IdFPS, IdPersonne, NoFPS, Violent, CD,
    Echappe, Suicidaire, Desequilibre,
    Contagieux, Violence, Fraude,
    ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
    Drogue, Mefait, Incendie, AutreInfraction) {
    return knex("FPS")
        .update({
            'NoFPS': NoFPS, 'CD': CD, 'Violent': Violent,
            'Echappe': Echappe, 'Suicidaire': Suicidaire,
            'Desequilibre': Desequilibre, 'Contagieux': Contagieux,
            'Violence': Violence, 'Fraude': Fraude,
            'ConduiteVehicule': ConduiteVehicule, 'IntroEffraction': IntroEffraction,
            'Sexe': Sexe, 'ArmeOffensive': ArmeOffensive, 'Vol': Vol, 'Drogue': Drogue,
            'Mefait': Mefait, 'Incendie': Incendie, 'AutreInfraction': AutreInfraction
        })
        .where({ 'IdFPS': IdFPS, 'IdPersonne': IdPersonne })
}

function deleteFps(IdFPS) {
    return knex("FPS").where({'IdFPS': IdFPS}).del()
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
    deleteFps
};
