/* eslint-disable linebreak-style */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const request = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const utilisateur = {
            Identifiant: req.body.Identifiant,
            Courriel: req.body.Courriel,
            MotDePasse: bcrypt.hashSync(req.body.MotDePasse, 10),
            Etudiant: req.body.Etudiant,
            NomFamille: req.body.NomFamille,
        };
        await request.postUtilisateur(utilisateur);
        resultat = await request.getUtilisateurByIdentifiant(req.body.Identifiant);
    } catch (error) {
        res.status(500).json(error);
    }

    if (resultat.length === 0) return res.status(404).json({ message: 'Aucune donnée trouvé', success: false });
    return res.status(200).json({ message: `L'utilisateur a été ajoutée avec succès Id: ${resultat[0].IdUtilisateur}`, success: true });
});

module.exports = router;
