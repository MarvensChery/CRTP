const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const request = require('../database/utilisateurs');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getUtilisateursAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { Courriel } = req.body;
        resultat = await request.connexion(Courriel);
    } catch (error) {
        res.status(500).json(error);
    }

    if (resultat.length === 0) {
        return res.status(404).json({ succes: false });
    }
    const verifMDP = bcrypt.compareSync(req.body.MotDePasse, resultat[0].MotDePasse);
    if (!verifMDP) return res.status(401).send('Informations invalides');

    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat[0].Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    req.session.token = accessToken;

    return res.status(200).json({
        succes: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

module.exports = router;
