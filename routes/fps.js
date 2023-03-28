const express = require('express');

const request = require('../database/fps');

const router = express.Router();
// Route pour récupérer un fps selon l'id
router.get('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    let resultat;
    if (idFps === undefined){
        return res.status(400).json('id manquant');
    }
    try {
        resultat = await request.getFps(idFps);
    } catch (error) {
        res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        return res.status(404).json({ message: "L'information n'existe pas dans la base de donnée !" });
    }
    return res.status(200).json(resultat);
});
// Route pour ajouter un fps
router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const {
        IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;
    try {
        await request.addFps(
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
        );
        await request.updateDescription(
            IdPersonne,
            Race,
            Taille,
            Poids,
            Yeux,
            Marques,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json({ message: "L'ajout du FPS est réussi !" });
});
// Route pour modifier un fps selon l'id
router.put('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    const {
        IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;
    try {
        await request.updateFps(
            idFps,
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
        );

        await request.updateDescription(
            IdPersonne,
            Race,
            Taille,
            Poids,
            Yeux,
            Marques,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json({ message: 'La modification du FPS est réussi !' });
});
// Route pour supprimer un fps selon l'id
router.delete('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    try {
        await request.deleteFps(idFps);
    } catch (error) {
        res.status(500).json(error.message);
    }
    return res.status(200).json({ message: 'La suppression du FPS est réussi !' });
});

module.exports = router;
