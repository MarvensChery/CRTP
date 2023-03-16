const express = require('express');
const db = require('../database/armes');

const router = express.Router();

// Requête pour obtenir une arme avec son id.
router.get('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant' });
        }
        const arme = await db.getArmeById(req.params.IdArme);

        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données` });
        }
        return res.status(200).json(arme);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Requête pour obtenir toutes les armes
router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const armes = await db.getArmesAll();
        if (!armes.length) {
            return res.status(404).json({ message: 'Aucune donnée a été trouvée' });
        }
        return res.status(200).json(armes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Requête pour insérer une arme
router.post('/', async (req, res) => {
    try {
        if (!req.body.NoSerie || !req.body.Marque || !req.body.Calibre
            || !req.body.TypeArme || !req.body.NoEvenement) {
            return res.status(400).json({ message: 'Un ou des paramètres du body sont manquants' });
        }
        const id = await db.insertArme(req.body);
        const armeNouvelle = await db.getArmeById(id);
        return res.status(200).json(armeNouvelle);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Requête pour modifier une arme
router.put('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant' });
        }
        if (!req.body.NoSerie || !req.body.Marque || !req.body.Calibre
            || !req.body.TypeArme || !req.body.NoEvenement) {
            return res.status(400).json({ message: 'Un ou des paramètres du body sont manquants' });
        }

        const arme = await db.getArmeById(req.params.IdArme);
        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données` });
        }
        const rows = await db.updateArme(req.body, req.params.IdArme);
        if (rows !== 1) {
            return res.status(500).json({ message: 'Il y a une erreur avec le serveur' });
        }
        const armeUpdate = await db.getArmeById(req.params.IdArme);
        return res.status(200).json(armeUpdate);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Requête pour supprimer une arme
router.delete('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant' });
        }
        const arme = await db.getArmeById(req.params.IdArme);
        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données` });
        }
        const rows = await db.deleteArme(req.params.IdArme);
        if (rows !== 1) {
            return res.status(500).json({ message: 'Il y a une erreur avec le serveur' });
        }
        return res.status(200).json({ message: 'L\'arme a bien été supprimée' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Exporter le router.
module.exports = router;
