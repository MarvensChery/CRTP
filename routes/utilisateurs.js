const express = require('express');

// const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const request = require('../database/utilisateurs');
const request2 = require('../database/personnes');

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

router.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (+(req.params.id)) {
        let resultat;
        try {
            resultat = await request.getUtilisateurById(req.params.id);
        } catch (error) {
            res.status(500).json(error.message);
        }

        return res.status(200).json(resultat);
    }

    return res.status(400).json({ message: 'Mauvaise formulation', success: false });
});
// route pour delete l'entité.
router.delete('/delete/:IdUtilisateur', async (req, res) => {
    if (+(req.params.IdUtilisateur)) {
        let data;
        try {
            data = await request.getUtilisateurById(req.params.IdUtilisateur);
            if (data.length === 0) {
            // retourne message d'erreur.
                return res.status(404).json({ message: 'Aucune donnée trouvée', success: false });
            }

            await request.deleteUtilisateurs(req.params.IdUtilisateur);
            // retourne une confirmation.
            return res.status(200).json({ message: 'L\'objet a bien été supprimé', success: true });
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Mauvaise formulation', success: false });
    }
});

// update user
router.put('/update/:IdUtilisateur', async (req, res) => {
    if (+(req.params.IdUtilisateur)) {
        try {
            if (req.body.Identifiant === undefined || req.body.MotDePasse === undefined
            || req.body.Etudiant === undefined) return res.status(400).json({ message: 'Paramètre manquant', success: false });

            // verifier si l'entite est deja dans la base de donnees.
            const DataAdd = await request.getUtilisateurById(req.params.IdUtilisateur);
            // si non renvoye une erreur
            if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée', success: false });
            const hashedPassword = await bcrypt.hash(req.body.MotDePasse, 10);
            const DataToSend = {

                Identifiant: req.body.Identifiant,
                MotDePasse: hashedPassword,
                Etudiant: req.body.Etudiant,
            };
            /* donner en parametre le type de la table/ les donnees a update
        / et le id de l'entite a update. */
            await request.updateUtilisateurs(DataToSend, req.params.IdUtilisateur);
            return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Mauvaise formulation', success: false });
    }
});

router.post('/', async (req, res) => {
    //  Creation d'un utilisateur
    const {
        Identifiant, MotDePasse, Etudiant, IdPersonne,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    console.log(Identifiant, MotDePasse, Etudiant, IdPersonne);
    const userExists = await request.getUtilisateurByIdentifiant(Identifiant);
    const personneExists = await request2.InfoPersonneIppebyId(IdPersonne);
    if (userExists.length > 0) {
        return res.status(409).json({ message: 'Utilisateur existe déjà' });
    }
    if (personneExists.length === 0) {
        return res.status(409).json({ message: "La personne n'existe pas" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(MotDePasse, 10);

    // Insérer l'utilisateur en base de données
    await request.insertUtilisateurs(Identifiant, hashedPassword, Etudiant, IdPersonne);

    return res.status(200).json('haha');
});

module.exports = router;
