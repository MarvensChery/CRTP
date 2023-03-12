const express = require('express');

const db = require('../database/armes');

const router = express.Router();

// Requête pour obtenir une arme avec son id.
router.get('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant', success: false });
        }
        const arme = await db.getArmeById(req.params.IdArme);

        if (!arme.length) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données`, success: false });
        }
        return res.status(200).json(arme[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour obtenir toutes les armes
router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const armes = await db.getArmesAll();
        if (!armes.length) {
            return res.status(404).json({ message: 'Aucune donnée a été trouvée', success: false });
        }
        return res.status(200).json(armes);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour insérer une arme
router.post('/', async (req, res) => {
    try {
        if (!req.body.NoSerie || !req.body.Marque || !req.body.Calibre
            || !req.body.TypeArme || !req.body.NoEvenement) {
            return res.status(400).json({ message: 'Un ou des paramètres du body sont manquants', success: false });
        }
        await db.insertArme(req.body);
        const armeNouvelle = await db.getArmeByNoEvenement(req.body.NoEvenement);
        return res.status(200).json({ message: 'L\'arme a été ajoutée avec succès', success: true, id: armeNouvelle.IdIBAF });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour modifier une arme
router.put('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant', success: false });
        }
        if (!req.body.NoSerie || !req.body.Marque || !req.body.Calibre
            || !req.body.TypeArme || !req.body.NoEvenement) {
            return res.status(400).json({ message: 'Un ou des paramètres du body sont manquants', success: false });
        }

        const arme = await db.getArmeById(req.params.IdArme);
        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données`, success: false });
        }
        const rows = await db.updateArme(req.body, req.params.IdArme);
        return res.status(200).json({ message: `L'arme a bien été modifiée lignes:${rows}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour supprimer une arme
router.delete('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant', success: false });
        }
        const arme = await db.getArmeById(req.params.IdArme);
        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données`, success: false });
        }
        const rows = await db.deleteArme(req.params.IdArme);
        return res.status(200).json({ message: `L'arme a bien été supprimée lignes:${rows}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Exporter le router.
module.exports = router;
