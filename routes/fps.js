const express = require('express');

const request = require('../database/fps');

const router = express.Router();

router.get('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let idFps = req.params.idFps;
    // const { IdPersonne } = req.body;
    let resultat;
    try {
        // resultat = await request.getFps(idFps, IdPersonne);
        resultat = await request.getFps(idFps);
    } catch (error) {
        res.status(500).json(error.message);
    }
    return res.status(200).json(resultat);
});

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques } = req.body;
    try {
        await request.addFps(IdPersonne, NoFPS, Violent, CD,
            Echappe, Suicidaire, Desequilibre,
            Contagieux, Violence, Fraude,
            ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
            Drogue, Mefait, Incendie, AutreInfraction);
        await request.updateDescription(IdPersonne, Race, Taille, Poids,
            Yeux, Marques);
    } catch (error) {
        res.status(500).json(error.message);
    }

    // return res.status(200).json({ message: "L'ajout du FPS est réussi !" });
});

router.put('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let idFps = req.params.idFps;
    const { IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques } = req.body;
    try {
        await request.updateFps(idFps, IdPersonne, NoFPS, Violent, CD,
            Echappe, Suicidaire, Desequilibre,
            Contagieux, Violence, Fraude,
            ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
            Drogue, Mefait, Incendie, AutreInfraction);
    } catch (error) {
        res.status(500).json(error.message);
    }
    try {
        await request.updateDescription(IdPersonne, Race, Taille, Poids,
            Yeux, Marques);
    } catch (error) {
        res.status(500).json(error.message);
    }
    return res.status(200).json({ message: "La modification du FPS est réussi !" });
});

router.delete('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let idFps = req.params.idFps;
    try {
        await request.deleteFps(idFps);
    } catch (error) {
        res.status(500).json(error.message);
    }
    return res.status(200).json({ message: "La suppression du FPS est réussi !" });
});

module.exports = router;
