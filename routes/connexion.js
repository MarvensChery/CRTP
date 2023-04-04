const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const request = require('../database/utilisateurs');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    return res.status(200).json('Page de connexion!');
});

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    if (req.body.identifiant === '' || req.body.motDePasse === '' || req.body.etudiantOuProf === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'L\'identifiant, le mot de passe ou le type d\'utilisateur ne peuvent être vide.',
            success: false,
        });
    }

    let resultat;
    try {
        const { identifiant, motDePasse, etudiantOuProf } = req.body;
        resultat = await request.connexion(identifiant, etudiantOuProf);
        const resultatTestPassword = bcrypt.compareSync(motDePasse, resultat[0].MotDePasse);

        if (resultat.length === 0 || !resultatTestPassword) {
            return res.status(404).json({ message: 'Utilisateur inexistant ou mot de passe non valide', success: false });
        }
    } catch (error) {
        res.status(500).json(error);
    }

    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat[0].Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    return res.status(200).json({
        success: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

module.exports = router;
