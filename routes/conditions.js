const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

router.put('/:idCondition', async (req, res) => {
    if (!Number(req.params.idCondition) || req.body.IdIPPE === undefined
            || req.body.IdPersonne === undefined || req.body.Libelle === undefined
            || req.body.HeureDebut === undefined || req.body.HeureFin === undefined
            || req.body.Victime === undefined || req.body.Frequentation === undefined) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });

    try {
        const DataToSend = {
            IdIPPE: req.body.IdIPPE,
            IdPersonne: req.body.IdPersonne,
            Libelle: req.body.Libelle,
            HeureDebut: req.body.HeureDebut,
            HeureFin: req.body.HeureFin,
            Victime: req.body.Victime,
            Frequentation: req.body.Frequentation,
        };

        const resultat = await request.updateCondition(DataToSend, req.params.idCondition);

        if (resultat === 1) return res.status(200).json({ message: 'L\'entité a été modifié avec succès' });
        return res.status(404).json({ message: 'L\'entité n\'existe pas dans la base de donnée' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/ippes/:idIppe', async (req, res) => {
    if (!Number(req.params.idIppe)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const data = await request.getConditionsOfEvenement(req.params.idIppe);
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
    if (req.body.IdPersonne === undefined || req.body.Libelle === undefined
        || req.body.HeureDebut === undefined || req.body.HeureFin === undefined || req.body.Victime === undefined || req.body.Frequentation === undefined) return res.status(400).json({ message: 'Paramètre manquant' });
    try {
        const nouvelleCondition = {
            IdIPPE: req.body.IdIPPE,
            IdPersonne: req.body.IdPersonne,
            Libelle: req.body.Libelle,
            HeureDebut: req.body.HeureDebut,
            HeureFin: req.body.HeureFin,
            Victime: req.body.Victime,
            Frequentation: req.body.Frequentation,
        };

        const resultat = await request.insertCondition(nouvelleCondition);

        return res.status(200).json(resultat);
    } catch (error) {
        console.error(`Erreur lors de l'insertion de la nouvelle condition: ${error.message}`);
        return res.status(500).json({ error: 'Erreur lors de l\'insertion de la nouvelle condition.' });
    }
});

// Ajouter une condition avec des heures

// Supprimer une condition
router.delete('/:IdCondition', async (req, res) => {
    if (!Number(req.params.IdCondition)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const resultat = await request.deleteCondition(req.params.IdCondition);
        if (resultat === 1) return res.status(200).json({ message: 'La suppression de la condition est réussi !' });

        return res.status(404).json({ message: 'Aucune donnée trouvé' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// Retourner la condition
router.get('/:IdCondition', async (req, res) => {
    if (!Number(req.params.idValeur)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const data = await request.getCondition(req.params.IdCondition);
        if (data.length === 0) {
            return res.status(404).json({ message: "La condition que vous recherchez n'existe pas !" });
        }
        return res.status(200).send(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
