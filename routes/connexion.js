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
        const { Identifiant } = req.body;
        if (Identifiant === undefined || req.body.MotDePasse === undefined) return res.status(400).json({ message: 'Le courriel out le mot de passe ne peut pas être vide' });
        resultat = await request.getUtilisateurByIdentifiant(Identifiant);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    const verifMDP = bcrypt.compareSync(req.body.MotDePasse, resultat[0].MotDePasse);
    if (!verifMDP) return res.status(401).json({ message: 'Courriel ou mot de passe invalide' });

    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat[0].Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    req.session.token = accessToken;

    return res.status(200).json({
        Identifiant: resultat[0].Identifiant,
        Etudiant: resultat[0].Etudiant,
        IdPersonne: resultat[0].IdPersonne,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

module.exports = router;
