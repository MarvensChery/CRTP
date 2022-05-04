const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

router.put('/:IdCondition', async (req, res) => {
    const IdCondition = req.params.IdCondition;
    const { Libelle, Champs1, Champs2, IdPersonne } = req.body;
    if (Libelle === 'Ne pas entrer en contact avec') {
        try {
            await request.updateVictime(IdCondition, Champs1);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !'});
    } else if (Libelle === 'Ne pas fréquenter') {
        try {
            await request.updateFrequentation(IdCondition, Champs1);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !'});
    }
    // Update une condition avec une adresse
     else if (Libelle === 'Avoir comme adresse le') {
        try {
            await request.updateAdresse(IdPersonne, Champs1);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !'});
    } else if (Libelle === 'Doit demeurer à cet endroit entre') {
        try {
            await request.updateHeure(IdCondition, Champs1, Champs2);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !'});
    }
    return res.status(401).json({ message: "Cette condition n'est pas encore pris en charge par notre base de donnée !"});
});

router.post('/', async (req, res) => {
    const {
        IdIppe,
        Libelle,
        Champs1,
        Champs2,
        Champs3,
        IdPersonne,
        Option,
    } = req.body;

    if (Option === '3' || Option === '4') {
        try {
            await request.ajouterCondition(IdIppe, Libelle, IdPersonne);
        } catch (error) {
            return res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !"});
    } else if (Option === '2') {
        try {
            await request.ajouterCondition(IdIppe, Libelle, IdPersonne);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        try {
            await request.updateAdresse(IdPersonne, Champs1);
        } catch (error) {
            res.status(500).json({ message: error.message});
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !"});
    } else if (Option === '5') {
        try {
            await request.ajouterConditionAvecVictime(IdIppe, Libelle, Champs1, IdPersonne);
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !"});
    } else if (Option === '6') {
        try {
            await request.ajouterConditionAvecFrequentation(
                IdIppe,
                Libelle,
                Champs1,
                IdPersonne,
            );
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !"});
    } else if (Option === '7') {
        try {
            await request.ajouterConditionAvecHeure(
                IdIppe,
                Libelle,
                Champs2,
                Champs3,
                IdPersonne,
            );
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !"});
    }
    return res.status(400).json({ message: "Veuillez choisir une condition !"});
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

    if (IdCondition === 0) {
        return res.status(404).json({ message: "La suppression de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La suppression de la condition est réussi !' });
});

// Retourner la condition
router.get('/:IdCondition', async (req, res) => {
    let IdCondition;
    let resultat;
    try {
        IdCondition = req.params.IdCondition;
        resultat = await request.returnCondition(IdCondition);
    } catch (error) {
        res.status(500).json(error.message);
    }
    return res.status(200).send(resultat);
});

module.exports = router;
