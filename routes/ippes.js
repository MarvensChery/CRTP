const express = require('express');
const db = require('../database/ippes');

const router = express.Router();

// Route pour GET idIPPE
router.get('/:IdIPPE', async (req, res) => {
    let resultat;
    const { IdIPPE } = req.params;
    if (!IdIPPE) {
        return res.status(400).json({ message: 'La requête est mal formée ou les paramètres sont invalides.' });
    }
    try {
        if (!+(IdIPPE)) {
            return res.status(400).json({ message: 'Le paramètre "IdIPPE" n\'est pas un int' });
        }
        resultat = await db.getIPPE(IdIPPE);
        if (!resultat.length) {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            return res.status(404).json({ message: 'L\'IPPE n\'a pas été trouvé' });
        }

        // retourne que les valeurs au client; necessaire a la recherche IPPE
        return res.status(200).json(resultat[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
    }
});
router.post('/insertIppePersonne/:IdPersonne', async (req, res) => {
    // const { IPPE } = req.body.NoEvenement;
    const { IdPersonne } = req.params;
    console.log(req.body);
    console.log(IdPersonne);
    let resultat;

    try {
        await db.insertIppePersonne(IdPersonne, req.body);

        return res.status(200).json(resultat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});

// Route pour la modification d'un ippe
router.put('/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    const IPPE = req.body;

    if (req.body) {
        try {
            if (!+(IdIPPE)) {
                return res.status(400).json({ message: 'Le paramètre "IdIPPE" n\'est pas un int' });
            }
            const exist = await db.getIPPE(IdIPPE);
            if (!exist.length) return res.status(404).json({ message: 'L\'IPPE n\'a pas été trouvé' });
            const message = await db.updateIppe(IdIPPE, IPPE);
            if (message !== 1) return res.status(404).json({ message: 'L\'IPPE n\'a pas été ajouté' });
            const returnData = await db.getIPPE(IdIPPE);
            return res.status(200).json(returnData[0]);
        } catch (error) {
            return res.status(500).json({ message: 'Il y a eu une erreur interne' });
        }
    }
    return res.status(400).json({ message: 'La requête est mal formée ou les paramètres sont invalides.' });
});

// Route pour la suppression d'un ippe
router.delete('/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    try {
        if (!+(IdIPPE)) {
            return res.status(400).json({ message: 'Le paramètre "IdIPPE" n\'est pas un int' });
        }
        if (!req.params.IdIPPE) {
            return res.status(400).json({ message: 'La requête est mal formée ou les paramètres sont invalides.' });
        }
        const exist = await db.getIPPE(IdIPPE);
        if (!exist.length) {
            return res.status(404).json({ message: 'IPPE n\'a pas été trouvé' });
        }
        const deleteReponse = await db.deleteResponse(IdIPPE);
        return res.status(200).json({ message: `IPPE effacé. ${deleteReponse} ligne modifiée.` });
    } catch (error) {
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
    }
});

module.exports = router;
