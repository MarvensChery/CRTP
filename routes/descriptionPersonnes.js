/* eslint-disable linebreak-style */
const express = require('express');

const request = require('../database/personnes');

const router = express.Router();

router.put('/:idPersonne', async (req, res) => {
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
            Race: req.body.race,
            Taille: req.body.taille,
            Poids: req.body.poids,
            Yeux: req.body.yeux,
            Cheveux: req.body.cheveux,
            Marques: req.body.marques,
            Toxicomanie: req.body.toxicomanie,
            Desorganise: req.body.desorganise,
            Depressif: req.body.depressif,
            Suicidaire: req.body.suicidaire,
            Violent: req.body.violent,
            Gilet: req.body.gilet,
            Pantalon: req.body.Pantalon,
            AutreVetement: req.body.autreVetement,
        };

        const resultat = await request.updatePersonne(DataToSend, idPersonne);
        return res.status(200).json({ message: 'Personne modifiée', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
