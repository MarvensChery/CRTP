const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const request = require('../database/utilisateurs');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let resultat;
    try {
        resultat = await request.getUtilisateursAll();
    } catch (error) {
        return res.status(500).json(error.message);
    }
    return res.status(200).json(resultat);
});

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '');

    let resultat;
    try {
        const { identifiant, motDePasse } = req.body;
        resultat = await request.getUtilisateurByIdentifiant(identifiant);
        console.log(resultat);
        if (!resultat || resultat.length === 0) {
            return res.status(404).json({ succes: false, message: 'Identifiant incorrect' });
        }
        const match = await bcrypt.compare(motDePasse, resultat.MotDePasse);
        if (!match) {
            return res.status(404).json({ succes: false, message: 'Mot de passe incorrect' });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat.Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    return res.status(200).json({
        succes: true,
        Etudiant: resultat.Etudiant,
        Matricule: resultat.Identifiant,
        Nom: resultat.NomFamille,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

module.exports = router;
