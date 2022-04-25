const express = require('express');

const request = require('../database/conditions.js');

const router = express.Router();

// Retourner la condition
router.get('/:IdCondition', async (req, res) => {
    try {
        const IdCondition = req.params.IdCondition;
        const resultat = await request.ReturnCondition(IdCondition);
        const resultatformater = [];
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
        res.send(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// retourne une le idippe
router.get('/returnidippe/:Idpersonne', async (req, res) => {
    try {
        const Idpersonne = req.params.Idpersonne;
        const resultat = await request.ReturnIdippe(Idpersonne);
        const resultatformater = [];
        resultat.forEach((element) => {
            resultatformater.push({
                IdIPPE: element.IdIPPE,
                IdPersonne: element.IdPersonne,
            });
        });
        res.send(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// Update une condition avec une adresse
router.put('/updateconditionadresse/:Idpersonne/:Adresse1', async (req, res) => {
    try {
        const Idpersonne = req.params.Idpersonne;
        const Adresse1 = req.params.Adresse1;
        await request.UpdateAdresse(Idpersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec une victime
router.put('/updateconditionvictime/:IdCondition/:Victime', async (req, res) => {
    try {
        const IdCondition = req.params.IdCondition;
        const Victime = req.params.Victime;
        await request.UpdateVictime(IdCondition, Victime);
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec une frequentation
router.put('/updatefrequentation/:IdCondition/:Frequentation', async (req, res) => {
    try {
        const IdCondition = req.params.IdCondition;
        const Frequentation = req.params.Frequentation;
        await request.UpdateFrequentation(IdCondition, Frequentation);
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec des heures
router.put('/updateheure/:IdCondition/:HeureDebut/:HeureFin', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const HeureDebut = req.params.HeureDebut;
        const HeureFin = req.params.HeureFin;
        await request.UpdateHeure(IdCondition, HeureDebut, HeureFin);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition sans paramètre
router.post('/ajoutercondition/:Idpersonne/:Idippe/:Conditions', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const IdPersonne = req.params.Idpersonne;
        await request.AjouterCondition(IdIPPE, Condition, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une adresse
router.post('/ajouterconditionadresse/:Idippe/:Conditions/:Idpersonne/:Adresse1', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        IdPersonne = req.params.Idpersonne;
        const Adresse1 = req.params.Adresse1
        await request.AjouterCondition(IdIPPE, Condition, IdPersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }
    try {
        const IdPersonne = req.params.Idpersonne;
        const Adresse1 = req.params.Adresse1;
        await request.UpdateAdresse(IdPersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une victime
router.post('/ajouterconditionvictime/:Idpersonne/:Idippe/:Conditions/:Victime', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const Victime = req.params.Victime;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecVictime(IdIPPE, Condition, Victime, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une frequentation
router.post('/ajouterconditionfrequentation/:Idpersonne/:Idippe/:Conditions/:Frequentation', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const Frequentation = req.params.Frequentation;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecFrequentation(IdIPPE, Condition, Frequentation, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec des heures
router.post('/ajouterconditionheure/:Idpersonne/:Idippe/:Conditions/:HeureDebut/:HeureFin', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const HeureDebut = req.params.HeureDebut;
        const HeureFin = req.params.HeureFin;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecHeure(IdIPPE, Condition, HeureDebut, HeureFin, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Supprimer une condition
router.delete('/deletecondition/:IdCondition', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        await request.DeleteCondition(IdCondition);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

module.exports = router;
