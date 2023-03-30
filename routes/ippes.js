const express = require('express');
const db = require('../database/ippes');

const router = express.Router();

// Route pour GET idIPPE
router.get('/:IdIPPE', async (req, res) => {
    let resultat;
    const { IdIPPE } = req.params;
    if (IdIPPE === undefined) {
        return res.status(400).json('La requête est mal formée ou les paramètres sont invalides.');
    }
    try {
        resultat = await db.getIPPE(IdIPPE);
        if (resultat.length === 0) {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            return res.status(404).json('L\'IPPE n\'a pas été trouvé');
        }

        // retourne que les valeurs au client; necessaire a la recherche IPPE
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// Route pour la modification d'un ippe
router.put('/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    const IPPE = req.body;

    if (req.body) {
        try {
            const exist = await db.getIPPE(IdIPPE);
            if (!exist.length) return res.status(404).json({ message: 'L\'IPPE n\'a pas été trouvé' });
            const message = await db.updateIppe(IdIPPE, IPPE);
            if (message !== 1) return res.status(404).json({ message: 'L\'IPPE n\'a pas été ajouté' });
            const returnData = await db.getIPPE(IdIPPE);
            return res.status(200).json(returnData[0]);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    return res.status(400).json({ message: 'La requête est mal formée ou les paramètres sont invalides.' });
});

// Route pour la suppression d'un ippe
router.delete('/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    try {
        if (req.params.IdIPPE == null) {
            return res.status(400).json({ message: 'La requête est mal formée ou les paramètres sont invalides.' });
        }
        const exist = await db.getIPPE(IdIPPE);
        if (!exist.length) {
            return res.status(404).json({ message: 'IPPE n\'a pas été trouvé' });
        }
        const deleteReponse = await db.deleteResponse(IdIPPE);
        return res.status(200).json({ message: `IPPE effacer. ${deleteReponse} ligne modifier.` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
