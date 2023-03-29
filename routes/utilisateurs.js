const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const request = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const {
            identifiant, motDePasse, studentOrProf, nomFamille,
        } = req.body;
        const mdpHash = await bcrypt.hash(motDePasse, 10);
        const utilisateur = await request.inscription(
            identifiant,
            mdpHash,
            studentOrProf,
            nomFamille,
        );
        const expiresIn = 14400;
        const accessToken = jwt.sign(
            { identifiant: utilisateur.Identifiant },
            process.env.TOKEN_KEY,
            { expiresIn },
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
