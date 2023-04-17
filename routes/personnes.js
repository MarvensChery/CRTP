const express = require('express');
const request = require('../database/personnes');
const dbIPPE = require('../database/ippes');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const resultat = await request.getPersonnesAll();
        res.status(200).json(resultat);
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

router.get('/:idPersonne/infoIPPE', async (req, res) => {
    try {
        const data = await request.InfoPersonneIppebyId(req.params.idPersonne);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ error: 'not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// eslint-disable-next-line consistent-return
router.get('/:idPersonne', async (req, res) => {
    const { idPersonne } = req.params;

    // Vérification des paramètres passés dans l'url.
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    try {
        const resultat = await request.getPersonneById(idPersonne);
        if (resultat.length === 0) {
            res.status(404).json({ message: 'Personne non trouvée.', success: false });
        } else {
            res.status(200).json(resultat);
        }
    } catch (error) {
        res.status(500).json({ error: error.message, success: false });
    }
});

router.post('/', async (req, res) => {
    // Vérification des paramètres passés dans le body de la requête.
    if (req.body.TypePersonne === '' || req.body.NomFamille === '' || req.body.Prenom1 === '' || req.body.Masculin === ''
    || req.body.DateNaissance === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'Le type, le nom de famille, le prénom, le genre, la date de naissance de la personne ne peuvent être vide. ',
            success: false,
        });
    }

    try {
        const DataToSend = {
            TypePersonne: req.body.TypePersonne,
            NomFamille: req.body.NomFamille,
            Prenom1: req.body.Prenom1,
            Prenom2: req.body.Prenom2,
            Masculin: req.body.Masculin,
            DateNaissance: req.body.DateNaissance,
            Telephone: req.body.Telephone,
            NoPermis: req.body.NoPermis,
            Adresse1: req.body.Adresse1,
            Adresse2: req.body.Adresse2,
            Ville: req.body.Ville,
            Province: req.body.Province,
            CodePostal: req.body.CodePostal,
        };
        const resultat = await request.insertPersonne(DataToSend);
        return res.status(200).json({
            message: 'Personne ajoutée',
            IdPersonne: resultat[0].IdPersonne,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.put('/:idPersonne', async (req, res) => {
    const { idPersonne } = req.params;
    // Vérification des paramètres passés dans l'url.
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }
    // Vérification des paramètres passés dans le body de la requête.
    if (req.body.TypePersonne === '' || req.body.NomFamille === '' || req.body.Prenom1 === '' || req.body.Masculin === ''
        || req.body.DateNaissance === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'Le type, le nom de famille, le prénom, le genre, la date de naissance de la personne ne peuvent être vide. ',
            success: false,
        });
    }

    try {
        // Vérification de l'existence de la personne dans la base de donnée.
        const verificationEntite = await request.getPersonneById(idPersonne);
        if (verificationEntite.length === 0) {
            return res.status(404).json({ message: 'La personne n\'existe pas dans la base de donnée', success: false });
        }

        const DataToSend = {
            TypePersonne: req.body.TypePersonne,
            NomFamille: req.body.NomFamille,
            Prenom1: req.body.Prenom1,
            Prenom2: req.body.Prenom2,
            Masculin: req.body.Masculin,
            DateNaissance: req.body.DateNaissance,
            Telephone: req.body.Telephone,
            NoPermis: req.body.NoPermis,
            Adresse1: req.body.Adresse1,
            Adresse2: req.body.Adresse2,
            Ville: req.body.Ville,
            Province: req.body.Province,
            CodePostal: req.body.CodePostal,
        };

        const resultat = await request.updatePersonne(DataToSend, idPersonne);
        return res.status(200).json({ message: 'Personne modifiée', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.delete('/:idPersonne', async (req, res) => {
    const { idPersonne } = req.params;

    // Vérification des paramètres passés dans l'url.
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    try {
        const verificationEntite = await request.getPersonneById(idPersonne);
        if (verificationEntite.length === 0) {
            return res.status(404).send({ message: 'Personne non trouvée', success: false });
        }

        const resultat = await request.deletePersonne(idPersonne);
        return res.status(200).send({ message: 'Une personne a été supprimé', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).send({ message: error.message, success: false });
    }
});

router.get('/:idPersonne/ippes', async (req, res) => {
    const { idPersonne } = req.params;
    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('les paramètres sont invalides.');
    }
    try {
        const resultat1 = await request.getPersonne(IdPersonne);
        if (!resultat1) {
            return res.status(404).send(`La personne avec l'id ${IdPersonne} n'a pas été trouvé.`);
        }
        const resultat2 = await request.getIppePersonne(IdPersonne);
        if (!resultat2.length || !resultat2) {
            return res.status(404).send('La personne ne possède pas d\'IPPE.');
        }
        return res.status(200).send(resultat2);
    } catch (error) {
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
    }
});

module.exports = router;
