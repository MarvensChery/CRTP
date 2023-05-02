const express = require('express');

const request = require('../database/crimes');

const router = express.Router();

router.get('/:idCrime', async (req, res) => {
    if (!Number(req.params.idCrime)) return res.status(400).json({ message: 'Paramètre invalide ou manquant' });
    try {
        const data = await request.getCrimeById(req.params.idCrime);
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
    try {
        const resultat = await request.getCrimesAll();
        if (resultat.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'Aucune donnée trouvé' });
        } // retourne que les valeurs au client;
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
