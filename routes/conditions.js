const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

// Retourner la condition
router.get('/:IdCondition', async (req, res) => {
    const IdCondition = req.params.IdCondition;
    let resultat = [];
    if (Number.isNaN(IdCondition)) {
        return res.status(400).json({message: "L'Id de condition ne peut jamais être null"});
    }
    try {
        resultat = await request.returnCondition(IdCondition);
        if (resultat.length === 0) {
            return res.status(404).json({message: "La condition que vous recherchez n'existe pas !"});
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
    return res.status(200).send(resultat);
});

// Update une condition
router.put('/:IdCondition', async (req, res) => {
    const { IdCondition } = req.params;
    const {
        Libelle, input1, Adresse1, input2, input3, IdPersonne, Adresse2, Ville, Province, CodePostal
    } = req.body;
    if ( Number.isNaN(IdCondition) ) {
        return res.status(400).json({message: "L'Id de condition ne peut jamais être null"});
    }
    if (Libelle.replace(/\s/g,'') === 'Nepasentrerencontactavec') {
        try {
            await request.updateVictime(IdCondition, input1);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !' });
    } if (Libelle.replace(/\s/g,'') === 'Nepasfréquenter') {
        try {
            await request.updateFrequentation(IdCondition, input1);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !' });
    }
    // Update une condition avec une adresse
    if (Libelle.replace(/\s/g,'') === 'Avoircommeadressele') {
        try {
            await request.updateAdresse(IdPersonne, Adresse1, Adresse2, Ville, Province, CodePostal);
        } catch (error) {
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !' });
    } if (Libelle.replace(/\s/g,'') === 'Doitdemeureràcetendroitentre') {
        try {
            await request.updateHeure(IdCondition, input2, input3);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: 'La modification de la condition est réussi !' });
    }
    return res.status(500).json({ message: "Cette condition n'est pas encore pris en charge par notre base de donnée !" });
});

// Ajouter une condition sans paramètre
router.post('/', async (req, res) => {
    const {
        IdIppe,
        Libelle,
        input1,
        input2,
        input3,
        IdPersonne,
        Option,
    } = req.body;

    if (Option.replace(/\s/g,'') === 'Doitgarderlapaixetavoirbonneconduite' || Option.replace(/\s/g,'') === "Aucuneconsommationd'alcooloudedroguenonprescrite") {
        try {
            await request.ajouterCondition(IdIppe, Libelle, IdPersonne);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
    } if (Option.replace(/\s/g,'') === 'Avoircommeadressele') {
        try {
            await request.ajouterCondition(IdIppe, Libelle, IdPersonne);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        try {
            await request.updateAdresse(IdPersonne, input1);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
    } if (Option.replace(/\s/g,'') === 'Nepasentrerencontactavec') {
        try {
            await request.ajouterConditionAvecVictime(IdIppe, Libelle, input1, IdPersonne);
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
    } if (Option.replace(/\s/g,'') === 'Nepasfréquenter') {
        try {
            await request.ajouterConditionAvecFrequentation(
                IdIppe,
                Libelle,
                input1,
                IdPersonne,
            );
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
    } if (Option.replace(/\s/g,'') === 'Doitdemeureràcetendroitentre') {
        try {
            await request.ajouterConditionAvecHeure(
                IdIppe,
                Libelle,
                input2,
                input3,
                IdPersonne,
            );
        } catch (error) {
            res.status(500).json(error.message);
        }
        return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
    }
    return res.status(500).json({ message: 'Veuillez choisir une condition !' });
});

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
        return res.status(400).json({message: "L'Id de condition ne peut jamais être null"});
    }

    return res.status(200).json({ message: 'La suppression de la condition est réussi !' });
});

module.exports = router;
