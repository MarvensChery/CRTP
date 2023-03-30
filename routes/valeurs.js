/* eslint-disable max-len */
const express = require('express');

const request = require('../database/valeurs');

const router = express.Router();
// Requete pour obtenir idValeur et retourn valeur.
router.get('/:idValeur', async (req, res) => {
    if (!Number(req.params.idValeur)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const data = await request.getValeurById(req.params.idValeur);
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'Aucune donnée trouvé' });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/', async (res) => {
    try {
        const data = await request.getValeursAll();
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'Aucune donnée trouvé' });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    // choix des infos a envoyer selon la banque de données choisi
    if (req.body.Identifiant === undefined || req.body.Auteur === undefined || req.body.TypeValeur === undefined
            || req.body.TypeEvenement === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'Paramètre manquant' });

    try {
        const DataToSend = {
            Identifiant: req.body.Identifiant,
            Auteur: req.body.Auteur,
            TypeValeur: req.body.TypeValeur,
            TypeEvenement: req.body.TypeEvenement,
            NoEvenement: req.body.NoEvenement,
        };

        const resultat = await request.insertValeur(DataToSend);

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// route pour modifier les donnees dans la base
router.put('/:idValeur', async (req, res) => {
    if (!Number(req.params.idValeur) || (req.body.Identifiant === undefined || req.body.Auteur === undefined || req.body.TypeValeur === undefined
            || req.body.TypeEvenement === undefined || req.body.NoEvenement === undefined)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const DataToSend = {
            Identifiant: req.body.Identifiant,
            Auteur: req.body.Auteur,
            TypeValeur: req.body.TypeValeur,
            TypeEvenement: req.body.TypeEvenement,
            NoEvenement: req.body.NoEvenement,
        };

        const resultat = await request.updateValeur(DataToSend, req.params.idValeur);

        if (resultat === 1) return res.status(200).json({ message: 'L\'entité a été modifié avec succès' });
        return res.status(404).json({ message: 'L\'entité n\'existe pas dans la base de donnée' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// route pour delete l'entité
router.delete('/:idValeur', async (req, res) => {
    if (!Number(req.params.idValeur)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const resultat = await request.deleteValeur(req.params.idValeur);
        if (resultat === 1) return res.status(200).json({ message: 'L\'objet a bien été supprimé' });

        return res.status(404).json({ message: 'Aucune donnée trouvé' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
