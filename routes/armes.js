const express = require('express');
const db = require('../database/armes');

const router = express.Router();

// Requete pour obtenir le noserie et retourne valeurs.
router.get('/numSerie/:numSerie', async (req, res) => {
    const { numSerie } = req.params;
    let data;

    if (numSerie) {
        try {
            data = await db.getArmeByNumSerie(numSerie);
            if (data.length === 0) {
                return res.status(404).json({ message: 'Aucune donnée trouvée.', success: false });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Numéro de série manquant.', success: false });
    }
});
// Requête pour obtenir une arme avec son id.
router.get('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant' });
        }
        if (!+(req.params.IdArme)) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" n\'est pas un int' });
        }
        const arme = await db.getArmeById(req.params.IdArme);
        if (!arme) {
            return res.status(404).json({ message: `${req.params.IdArme} ne correspond à aucune 'IdArme' dans la base de données` });
        }
        return res.status(200).json(arme);
    } catch (error) {
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
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
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
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
        const armeNouvelle = await db.getArmeById(id.IdIBAF);
        return res.status(200).json(armeNouvelle);
    } catch (error) {
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
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
        if (!+(req.params.IdArme)) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" n\'est pas un int' });
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
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
    }
});

// Requête pour supprimer une arme
router.delete('/:IdArme', async (req, res) => {
    try {
        if (!req.params.IdArme) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" est manquant' });
        }
        if (!+(req.params.IdArme)) {
            return res.status(400).json({ message: 'Le paramètre "IdArme" n\'est pas un int' });
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
        return res.status(500).json({ message: 'Il y a eu une erreur interne' });
    }
});

// Exporter le router.
module.exports = router;
