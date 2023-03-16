/* eslint-disable linebreak-style */
const express = require('express');
const bcrypt = require('bcrypt');

const request = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const utilisateur = {
            Identifiant: req.body.Identifiant,
            MotDePasse: bcrypt.hashSync(req.body.MotDePasse, 10),
            Etudiant: req.body.Etudiant,
            IdPersonne: req.body.IdPersonne,
        };
        await request.postUtilisateur(utilisateur);
        resultat = await request.getUtilisateurByIdentifiant(req.body.Identifiant);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la requête', success: false });
    }

    if (!resultat || resultat.length === 0) {
        return res.status(404).json({ message: 'Aucun utilisateur trouvé', success: false });
    }

    return res.status(200).json({ message: `L'utilisateur a été ajouté avec succès Id: ${resultat[0].IdUtilisateur}`, success: true });
});

module.exports = router;
