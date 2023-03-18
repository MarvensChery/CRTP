const express = require('express');

const request = require('../database/crimes');

const router = express.Router();

router.get('/:idCrime', async (req, res) => {
    try {
        let data;
        if (req.params.idCrime !== undefined) data = await request.getCrimeById(req.params.idCrime);
        else return res.status(400).json({ message: 'Paramètre manquant' });
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

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getCrimesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

module.exports = router;
