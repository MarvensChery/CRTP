const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);
function getFps() {
    return knex('FPS')
        .select('*');
}
function getFpsId(IdFPS) {
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

// eslint-disable-next-line no-unused-vars
function getPersonnesFps(IdPersonne) {
    return knex('FPS')
        .select('*')
        .where('IdPersonne', '=', IdPersonne);
}

function addFps(data) {
    return knex('FPS')
        .insert(data).returning('*');
}

function updateDescription(data, IdPersonne) {
    return knex('Personnes')
        .update(data)
        .where({ IdPersonne });
}

function updateFps(data, IdFPS, IdPersonne) {
    return knex('FPS')
        .update(data)
        .where({ IdFPS, IdPersonne }).returning('*');
}

function deleteFps(IdFPS) {
    return knex('FPS').where({ IdFPS }).del();
}

module.exports = {
    getFps,
    getFpsId,
    addFps,
    updateDescription,
    updateFps,
    deleteFps,
    getPersonnesFps,
};
