/* eslint-disable linebreak-style */
const express = require('express');
const bcrypt = require('bcrypt');

const request = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    if (req.body.Identifiant === undefined || req.body.MotDePasse === undefined || req.body.Etudiant === undefined || req.body.IdPersonne === undefined) return res.status(400).json({ message: 'Paramètre manquant' });
    try {
        const utilisateur = {
            Identifiant: req.body.Identifiant,
            MotDePasse: bcrypt.hashSync(req.body.MotDePasse, 10),
            Etudiant: req.body.Etudiant,
            IdPersonne: req.body.IdPersonne,
        };

        const resultat = await request.insertUtilisateur(utilisateur);
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: 'Une erreur est survenue lors de la requête' });
    }
});

module.exports = router;
