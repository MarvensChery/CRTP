const express = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

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
    try {
        const { Identifiant, MotDePasse, studentOrProf } = req.body;
        const utilisateur = await request.connexion(Identifiant, studentOrProf);
        if (!utilisateur) {
            return res.status(404).json({ succes: false });
        }
        const passwordMatch = await bcrypt.compare(MotDePasse, utilisateur.MotDePasse);
        if (!passwordMatch) {
            return res.status(401).json({ succes: false });
        }
        const expiresIn = 14400;
        const accessToken = jwt.sign(
            { identifiant: utilisateur.Identifiant },
            process.env.TOKEN_KEY,
            { expiresIn }
        );
        return res.status(200).json({
            succes: true,
            Etudiant: utilisateur.Etudiant,
            Matricule: utilisateur.Identifiant,
            Nom: utilisateur.NomFamille,
            access_token: accessToken,
            expires_in: expiresIn,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
