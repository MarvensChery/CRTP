const express = require('express');
const db = require('../database/ippes');

const router = express.Router();

// Route pour GET l'ippe par idPersonne et idIPPE
router.get('/:IdIPPE', async (req, res) => {
    let resultat;
    const { IdIPPE } = req.params;
    if (IdIPPE === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await db.getIPPE(IdIPPE);
        if (resultat.length === 0) {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            return res.status(404).json('Cette personne n\'est pas répertoriée');
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
            if (!exist.length) return res.status(404).json({ success: false, message: 'IPPE not found' });
            await db.updateIppe(IdIPPE, IPPE);
        } catch (error) {
            return res.status(500).json({ success: false, message: 'réponse non modifiée' });
        }
        return res.status(200).json({ success: true, message: 'réponse modifiée' });
    }
    return res.status(400).json({ success: false, message: "manque d'élément à modifier" });
});

// Route pour la suppression d'un ippe
router.delete('/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    try {
        if (req.params.IdIPPE == null) {
            return res.status(400).json({ success: false, message: 'identifiant manquant' });
        }
        const exist = await db.getIPPE(IdIPPE);
        if (!exist.length) {
            return res.status(404).json({ success: false, message: 'IPPE not found' });
        }
        const deleteReponse = await db.deleteResponse(IdIPPE);
        return res.status(200).json({ success: true, message: `IPPE effacer. ${deleteReponse} ligne modifier.` });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
