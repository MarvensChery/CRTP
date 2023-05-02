const express = require('express');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const db = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        res.header('Access-Control-Allow-Origin', '*');
        const { Identifiant, MotDePasse } = req.body;
        const utilisateur = await db.getUtilisateurByIdentifiant(Identifiant);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Identifiant incorrect' });
        }
        if (!bcrypt.compareSync(MotDePasse, utilisateur.MotDePasse)) {
            return res.status(404).json({ message: 'Mot de passe incorrect' });
        }
        const expiresIn = 14400;

        const accessToken = jwt.sign(
            { identifiant: utilisateur.Identifiant },
            process.env.TOKEN_KEY,
            { expiresIn },
        );
        return res.status(200).json({
            Etudiant: utilisateur.Etudiant,
            Matricule: utilisateur.Identifiant,
            token: accessToken,
            expires_in: expiresIn,
        });
    } catch (error) { return res.status(500).json({ message: error.message }); }
});

module.exports = router;
