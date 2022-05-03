const express = require('express');

const request = require('../database/conditions');

const router = express.Router();

// Ajouter une condition sans paramètre
router.post('/ajoutercondition/:Idpersonne/:Idippe/:Conditions', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        IdPersonne = req.params.Idpersonne;
        await request.ajouterCondition(IdIPPE, Condition, IdPersonne);
    } catch (error) {
        return res.status(500).json(error.message);
    }
    if (IdPersonne === 0) {
        return res.status(404).json({ message: "L'ajout de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
});

// Ajouter une condition avec une victime
router.post('/ajouterconditionvictime/:Idpersonne/:Idippe/:Conditions/:Victime', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { Victime } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.ajouterConditionAvecVictime(IdIPPE, Condition, Victime, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json({ message: "L'ajout de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
});

// Ajouter une condition avec une frequentation
router.post('/ajouterconditionfrequentation/:Idpersonne/:Idippe/:Conditions/:Frequentation', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { Frequentation } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.ajouterConditionAvecFrequentation(
            IdIPPE,
            Condition,
            Frequentation,
            IdPersonne,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json({ message: "L'ajout de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
});

// Ajouter une condition avec des heures
router.post('/ajouterconditionheure/:Idpersonne/:Idippe/:Conditions/:HeureDebut/:HeureFin', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { HeureDebut } = req.params;
        const { HeureFin } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.ajouterConditionAvecHeure(
            IdIPPE,
            Condition,
            HeureDebut,
            HeureFin,
            IdPersonne,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json({ message: "L'ajout de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
});

// Ajouter une condition avec une adresse
router.post('/ajouterconditionadresse/:Idippe/:Conditions/:Idpersonne/:adresse', async (req, res) => {
    const IdPersonne = req.params.Idpersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        await request.ajouterCondition(IdIPPE, Condition, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }
    try {
        const Adresse1 = req.params.adresse;
        await request.updateAdresse(IdPersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json({ message: "L'ajout de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: "L'ajout de la condition est réussi !" });
});

// Update une condition avec une adresse
router.put('/updateadresse/:Idpersonne/:Adresse1', async (req, res) => {
    let Idpersonne;
    try {
        Idpersonne = req.params.Idpersonne;
        const { Adresse1 } = req.params;
        await request.updateAdresse(Idpersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (Idpersonne === 0) {
        return res.status(404).json({ message: "La modification de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La modification de la condition est réussi !' });
});

// Update une condition avec une victime
router.put('/updatevictime/:IdCondition/:Victime', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { Victime } = req.params;
        await request.updateVictime(IdCondition, Victime);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json({ message: "La modification de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La modification de la condition est réussi !' });
});

// Update une condition avec des heures
router.put('/updateheure/:IdCondition/:HeureDebut/:HeureFin', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { HeureDebut } = req.params;
        const { HeureFin } = req.params;
        await request.updateHeure(IdCondition, HeureDebut, HeureFin);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json({ message: "La modification de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La modification de la condition est réussi !' });
});

// Update une condition avec une frequentation
router.put('/updatefrequentation/:IdCondition/:Frequentation', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { Frequentation } = req.params;
        await request.updateFrequentation(IdCondition, Frequentation);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json({ message: "La modification de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La modification de la condition est réussi !' });
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

    if (IdCondition === 0) {
        return res.status(404).json({ message: "La suppression de la condition a échoué ! La personne n'existe pas dans la base de donnée !" });
    }

    return res.status(200).json({ message: 'La suppression de la condition est réussi !' });
});

// Retourner la condition
router.get('/returncondition/:IdCondition', async (req, res) => {
    let IdCondition;
    const resultatformater = [];
    try {
        IdCondition = req.params.IdCondition;
        const resultat = await request.returnCondition(IdCondition);
        resultat.forEach((element) => {
            resultatformater.push({
                Id: element.IdCondition,
                IdIPPE: element.IdIPPE,
                IdPersonne: element.IdPersonne,
                Libelle: element.Libelle,
                HeureDebut: element.HeureDebut,
                HeureFin: element.HeureFin,
                Victime: element.Victime,
                Frequentation: element.Frequentation,
            });
        });
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultatformater.length === 0) {
        return res.status(404).json({ message: "La condition n'existe pas dans la base de donnée !" });
    }
    return res.status(200).send(resultatformater);
});

module.exports = router;
