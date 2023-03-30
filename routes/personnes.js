const express = require('express');

const request = require('../database/personnes');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getPersonnesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.get('/:idPersonne/infoIPPE', async (req, res) => {
    const data = await request.InfoPersonneIppebyId(req.params.idPersonne);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(400).json({ status: 'not found' });
    }
    return null;
});

// eslint-disable consistent-return
router.get('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour accéder à la ressource.');
    } */

    const { idPersonne } = req.params;
    let resultat;

    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }
    try {
        resultat = await request.getPersonne(idPersonne);
        if (resultat.length === 0 || resultat === undefined) {
            return res.status(404).send('La personne n\'existe pas!');
        }
        return res.status(200).send(resultat);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour ajouter la ressource.');
    } */

    const { TypePersonne } = req.body;
    const { NomFamille } = req.body;
    const { Prenom1 } = req.body;
    const { Prenom2 } = req.body;
    const { Masculin } = req.body;
    const { DateNaissance } = req.body;

    if (!TypePersonne || !NomFamille || !Prenom1 || Masculin === null || !DateNaissance) {
        return res.status(400).json('Le type de personne, prenom1, nom, sex et la DDN ne peuvent etre vide');
    }

    try {
        const id = await request.insertPersonne(
            TypePersonne,
            NomFamille,
            Prenom1,
            Prenom2,
            Masculin,
            DateNaissance,
        );
        return res.status(200).json({
            message: 'Personne ajoutée',
            IdPersonne: id,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
    /* {
        "TypePersonne": "Test",
        "NomFamille":"Test",
        "Prenom1":"test",
        "Prenom2":"test",
        "Masculin":1,
        "DateNaissance":"114445"
    }   */
});

router.put('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
            pour ajouter la ressource.');
    } */

    const { idPersonne } = req.params;
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    if (req.body.TypePersonne === '' || req.body.NomFamille === '' || req.body.Prenom1 === '' || req.body.Masculin === ''
        || req.body.DateNaissance === '') {
        return res.status(400).json({
            message: 'Paramètre(s) manquant.',
            details: 'Le type, le nom de famille, le prénom, le genre, la date de naissance de la personne ne peuvent être vide. ',
            success: false,
        });
    }

    try {
        const verificationEntite = await request.getPersonne(idPersonne);
        if (verificationEntite.length === 0) {
            return res.status(404).json({ message: 'La personne n\'existe pas dans la base de donnée', success: false });
        }

        const DataToSend = {
            TypePersonne: req.body.typePersonne,
            NomFamille: req.body.nomFamille,
            Prenom1: req.body.prenom1,
            Prenom2: req.body.prenom2,
            Masculin: req.body.masculin,
            DateNaissance: req.body.dateNaissance,
            Telephone: req.body.telephone,
            NoPermis: req.body.noPermis,
            Adresse1: req.body.adresse1,
            Adresse2: req.body.adresse2,
            Ville: req.body.ville,
            Province: req.body.province,
            CodePostal: req.body.codePostal,
        };

        const resultat = await request.updatePersonne(DataToSend, idPersonne);
        return res.status(200).json({ message: 'Personne modifiée', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.delete('/:idPersonne', async (req, res) => {
    // Pour quand on uilisera les tokens
    /* if(sessionStorage.getItem('Etudiant')){
        res.status(401).json(error.message, 'le client n’a pas les autorisations nécessaires
        pour supprimer la ressource.');
    } */

    const { idPersonne } = req.params;

    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('la requête est mal formée ou les paramètres sont invalides.');
    }
    try {
        // Supprime les conditions, les IPPE et la personne de la BD
        const response = await request.deletePersonne(idPersonne);
        if (response.length > 0) return res.status(200).send({ message: 'Une personne a été supprimé' });
        return res.status(404).send({ message: "Personne n'a été supprimé" });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.get('/:idPersonne/ippes', async (req, res) => {
    const { idPersonne } = req.params;
    if (Number.isNaN(idPersonne)) {
        return res.status(400).send('les paramètres sont invalides.');
    }
    try {
        const resultat = await request.getIppePersonne(idPersonne);
        if (resultat.length === 0 || resultat === undefined) {
            return res.status(404).send('La personne ne possède pas d\'IPPE!');
        }
        return res.status(200).send(resultat);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
