/* eslint-disable linebreak-style */
const express = require('express');

const request = require('../database/personnes');

const router = express.Router();

router.put('/:idPersonne', async (req, res) => {
    const { idPersonne } = req.params;
    // vérification des paramètres passés dans l'url.
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    try {
        // Vérification de l'existence de la personne dans la base de donnée.
        const verificationEntite = await request.getPersonneById(idPersonne);
        if (verificationEntite.length === 0) {
            return res.status(404).json({ message: 'La personne n\'existe pas dans la base de donnée', success: false });
        }

        const DataToSend = {
            Race: req.body.Race,
            Taille: req.body.Taille,
            Poids: req.body.Poids,
            Yeux: req.body.Yeux,
            Cheveux: req.body.Cheveux,
            Marques: req.body.Marques,
            Toxicomanie: req.body.Toxicomanie,
            Desorganise: req.body.Desorganise,
            Depressif: req.body.Depressif,
            Suicidaire: req.body.Suicidaire,
            Violent: req.body.Violent,
            Gilet: req.body.Gilet,
            Pantalon: req.body.Pantalon,
            AutreVetement: req.body.AutreVetement,
        };

        const resultat = await request.updatePersonne(DataToSend, idPersonne);
        return res.status(200).json({ message: 'Personne modifiée', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.post('/:idPersonne', async (req, res) => {
    const { idPersonne } = req.params;
    if (Number.isNaN(Number.parseInt(idPersonne, 10))) {
        return res.status(400).send({ message: 'La requête est mal formée.', success: false });
    }

    try {
        const verificationEntite = await request.getPersonneById(idPersonne);
        if (verificationEntite.length === 0) {
            return res.status(404).json({ message: 'La personne n\'existe pas dans la base de donnée', success: false });
        }

        const DataToSend = {
            Race: req.body.Race,
            Taille: req.body.Taille,
            Poids: req.body.Poids,
            Yeux: req.body.Yeux,
            Cheveux: req.body.Cheveux,
            Marques: req.body.Marques,
            Toxicomanie: req.body.Toxicomanie,
            Desorganise: req.body.Desorganise,
            Depressif: req.body.Depressif,
            Suicidaire: req.body.Suicidaire,
            Violent: req.body.Violent,
            Gilet: req.body.Gilet,
            Pantalon: req.body.Pantalon,
            AutreVetement: req.body.AutreVetement,
        };

        const resultat = await request.updatePersonne(DataToSend, idPersonne);
        return res.status(200).json({ message: 'Description ajoutée', success: true, 'ligne(s) modifiée(s)': resultat });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
