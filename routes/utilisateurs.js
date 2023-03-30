const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        req.body.MotDePasse = await bcrypt.hash(req.body.MotDePasse, 10);
        const utilisateur = await db.inscription(req.body);
        const expiresIn = 14400;
        const accessToken = jwt.sign(
            { identifiant: utilisateur.Identifiant },
            process.env.TOKEN_KEY,
            { expiresIn },
        );
        return res.status(200).json({
            Etudiant: utilisateur.Etudiant,
            Matricule: utilisateur.Identifiant,
            access_token: accessToken,
            expires_in: expiresIn,
        });
    } catch (error) { return res.status(500).json({ message: error.message }); }
});

module.exports = router;
