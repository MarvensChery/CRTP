const express = require('express');

// const jwt = require('jsonwebtoken');

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
// route pour delete l'entité.
router.delete('/delete/:IdUtilisateur', async (req, res) => {
    let data;
    try {
        data = await request.getUtilisateurById(req.params.IdUtilisateur);
        if (data.length === 0) {
            // retourne message d'erreur.
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }

        await request.deleteUtilisateurs(req.params.IdUtilisateur);
        // retourne une confirmation.
        return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// update user
router.put('/update/:IdUtilisateur', async (req, res) => {
    try {
        if (req.body.Identifiant === undefined || req.body.MotDePasse === undefined
            || req.body.Etudiant === undefined || req.body.NomFamille === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // verifier si l'entite est deja dans la base de donnees.
        const DataAdd = await request.getUtilisateurById(req.params.IdUtilisateur);
        // si non renvoye une erreur
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée', success: false });
        const hashedPassword = await bcrypt.hash(req.body.MotDePasse, 10);
        const DataToSend = {

            Identifiant: req.body.Identifiant,
            MotDePasse: hashedPassword,
            Etudiant: req.body.Etudiant,
            NomFamille: req.body.NomFamille,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update.
        await request.updateUtilisateurs(DataToSend, req.params.IdUtilisateur);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
