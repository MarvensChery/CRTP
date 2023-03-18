const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

router.put('/:idCondition', async (req, res) => {
    try {
        if (req.body.IdIPPE === undefined
            || req.body.IdPersonne === undefined || req.body.Libelle === undefined
            || req.body.HeureDebut === undefined || req.body.HeureFin === undefined
            || req.body.Victime === undefined || req.body.Frequentation === undefined) return res.status(400).json({ message: 'paramètre manquant' });

        // verifier si l'entite est deja dans la base de donnees
        const DataAdd = await request.getCondition(req.params.idCondition);
        // si non renvoye une erreur
        if (DataAdd.length === 0) return res.status(404).json({ message: 'L\'entité n\'existe pas dans la base de donnée' });

        const DataToSend = {
            IdIPPE: req.body.IdIPPE,
            IdPersonne: req.body.IdPersonne,
            Libelle: req.body.Libelle,
            HeureDebut: req.body.HeureDebut,
            HeureFin: req.body.HeureFin,
            Victime: req.body.Victime,
            Frequentation: req.body.Frequentation,
        };
        /* donner en parametre le type de la table/ les donnees a update/
        et le id de l'entite a update */
        await request.updateCondition(DataToSend, req.params.idCondition);
        return res.status(200).json({ message: 'L\'entité a été modifié avec succès' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/ippes/:idIppe', async (req, res) => {
    try {
        let data;
        if (req.params.idIppe !== undefined) { data = await request.getConditionsOfEvenement(req.params.idIppe); } else return res.status(400).json({ message: 'paramètre manquant' });
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

        await request.insertCondition(nouvelleCondition);

        return res.status(201).json({ message: 'La nouvelle condition a été insérée avec succès.' });
    } catch (error) {
        console.error(`Erreur lors de l'insertion de la nouvelle condition: ${error.message}`);
        return res.status(500).json({ error: 'Erreur lors de l\'insertion de la nouvelle condition.' });
    }
});

// Ajouter une condition avec des heures

// Supprimer une condition
router.delete('/:IdCondition', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        await request.deleteCondition(IdCondition);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (!IdCondition) {
        return res.status(400).json({ message: "L'Id de condition ne peut jamais être null" });
    }

    return res.status(200).json({ message: 'La suppression de la condition est réussi !' });
});

// Retourner la condition
router.get('/:IdCondition', async (req, res) => {
    const { IdCondition } = req.params;
    let resultat = [];
    if (Number.isNaN(IdCondition)) {
        return res.status(400).json({ message: "L'Id de condition ne peut jamais être null" });
    }
    try {
        resultat = await request.getCondition(IdCondition);
        if (resultat.length === 0) {
            return res.status(404).json({ message: "La condition que vous recherchez n'existe pas !" });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
    return res.status(200).send(resultat);
});

module.exports = router;
