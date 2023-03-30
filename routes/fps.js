/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
const express = require('express');

const request = require('../database/fps');

const router = express.Router();

const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let resultat;
    try {
        resultat = await request.getFps();
    } catch (error) {
        res.status(500).json(error.message);
    }
    if (resultat.length === 0) {
        return res.status(404).json({ message: "L'information n'existe pas dans la base de donnée !" });
    }
    return res.status(200).json(resultat);
});
// Route pour récupérer un fps selon l'id
router.get('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    let resultat;
    if (idFps === undefined) {
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

router.get('/personnes/:idPersonne/fps', async (req, res) => {
    const IdPersonne = req.params;
    let resultat;
    console.log('aaaaaaa', IdPersonne.idPersonne);
    try {
        resultat = await request.getPersonnesFps(IdPersonne.idPersonne);
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
    const DateMesure = new Date().toJSON().slice(0, 10);
    let IdPersonne
    const {
        NomFamille, Prenom1, Prenom2, Masculin, DateNaissance, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;
    try {
        IdPersonne = await request.getIdPersonne(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance);
        IdPersonne = IdPersonne[0].IdPersonne
        if (!IdPersonne) {
            res.status(404).json('Personne pas trouvé')
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
    try {
        await request.addFps(
            IdPersonne,
            NoFPS + "H",
            DateMesure,
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

    return res.status(200).json({ message: "l’entité a été ajoutée avec succès. L’entité ajoutée est dans le corps de la réponse, avec l’id généré" });
});
// Route pour modifier un fps selon l'id
router.put('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    let IdPersonne;
    const {
        NomFamille, Prenom1, Prenom2, Masculin, DateNaissance, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;
    try {
        IdPersonne = await request.getIdPersonne(NomFamille, Prenom1, Prenom2, Masculin, DateNaissance);
        if (!IdPersonne) {
            res.status(404).json('Personne pas trouvé')
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

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
