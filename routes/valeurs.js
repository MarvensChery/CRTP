/* eslint-disable max-len */
const express = require('express');

const request = require('../database/valeurs');

const router = express.Router();
// Requete pour obtenir idValeur et retourn valeur.
router.get('/:idValeur', async (req, res) => {
    try {
        let data;
        if (req.params.idValeur !== undefined) data = await request.getValeurById(req.params.idValeur);
        else return res.status(400).json({ message: 'paramètre manquant', success: false });
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await request.getValeursAll();
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.post('/', async (req, res) => {
    // Vérification des paramètres passés dans le body de la requête.
    if (req.body.Identifiant === '' || req.body.Auteur === '' || req.body.TypeValeur === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'L\'identifiant, l\'auteur, le type de valeur ne peuvent être vide.',
            success: false,
        });
    }

    const DataToSend = {
        Identifiant: req.body.Identifiant,
        Auteur: req.body.Auteur,
        TypeValeur: req.body.TypeValeur,
        TypeEvenement: req.body.TypeEvenement,
        NoEvenement: req.body.NoEvenement,
    };
    try {
        const resultat = await request.postValeur(DataToSend);
        return res.status(200).json({
            message: 'L’entité a été ajoutée avec succès',
            IdValeur: resultat[0].IdIBVA,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Route pour modifier les données dans la base.
router.put('/:idValeur', async (req, res) => {
    const { idValeur } = req.params;
    // Vérification des paramètres passés dans la requête.
    if (Number.isNaN(Number.parseInt(idValeur, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }
    // Vérification des paramètres passés dans le body de la requête.
    if (req.body.Identifiant === '' || req.body.Auteur === '' || req.body.TypeValeur === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'L\'identifiant, l\'auteur, le type de valeur ne peuvent être vide.',
            success: false,
        });
    }

    try {
        // Vérifier si l'entité est déjà dans la base de données.
        const verificationEntite = await request.getValeurById(req.params.idValeur);
        if (verificationEntite.length === 0) return res.status(404).json({ message: 'L\'entité n\'existe pas dans la base de donnée', success: false });

        const DataToSend = {
            Identifiant: req.body.Identifiant,
            Auteur: req.body.Auteur,
            TypeValeur: req.body.TypeValeur,
            TypeEvenement: req.body.TypeEvenement,
            NoEvenement: req.body.NoEvenement,
        };
        const resultat = await request.updateValeur(DataToSend, req.params.idValeur);
        return res.status(200).json({ message: 'L\'entité a été modifiée avec succès', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Route pour supprimer une entité.
router.delete('/:idValeur', async (req, res) => {
    const { idValeur } = req.params;

    // Vérification des paramètres passés dans la requête.
    if (Number.isNaN(Number.parseInt(idValeur, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    try {
        const verificationEntite = await request.getValeurById(idValeur);
        if (verificationEntite.length === 0) {
            return res.status(404).send({ message: 'Valeur non trouvée', success: false });
        }

        const resultat = await request.deleteValeur(idValeur);
        return res.status(200).send({ message: 'Une valeur a été supprimé', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false });
    }
});

module.exports = router;
