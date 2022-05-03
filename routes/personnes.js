const express = require('express');

const request = require('../database/personnes');

const router = express.Router();

router.get('/:idPersonne', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const idPersonne = req.params.idPersonne;
    let resultat;
    try {
        resultat = await request.getPersonne(idPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }
    if (resultat.length === 0){
        return res.status(404).json({ message: "La personne n'existe pas dans la base de donnée !" });
    }
    return res.status(200).json(resultat);
});

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

module.exports = router;
