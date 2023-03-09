const express = require('express');

const db = require('../database/armes');

const router = express.Router();
// Requête pour obtenir une arme avec son id.
router.get('/:idArme', async (req, res) => {
    try {
        if (!req.params.idArme) {
            return res.status(400).json({ message: 'Le paramètre "idArme" est manquant', success: false });
        }
        const arme = await db.getArmeById(req.params.idArme);

        if (!arme.length) {
            return res.status(404).json({ message: `${req.params.idArme} ne correspond à aucune idArme dans la base de données`, success: false });
        }
        return res.status(200).json(arme);
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
        const armeExistante = await db.getArmeByNoEvenement(req.body.NoEvenement);
        if (armeExistante.length) {
            return res.status(404).json({ message: 'L\'arme se trouve déja dans la base de données', success: false });
        }
        await db.insertArme(req.body);
        const armeNouvelle = await db.getArmeByNoEvenement(req.body.NoEvenement);
        if (!armeNouvelle.length) {
            return res.status(404).json({ message: 'Aucune a été donnée trouvée', success: false });
        }
        return res.status(200).json({ message: `L'arme a été ajoutée avec succès Id: ${armeNouvelle[0].IdIBAF}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour modifier une arme
router.put('/:idArme', async (req, res) => {
    try {
        if (!req.params.idArme) {
            return res.status(400).json({ message: 'Le paramètre "idArme" est manquant', success: false });
        }
        if (!req.body.NoSerie || !req.body.Marque || !req.body.Calibre
            || !req.body.TypeArme || !req.body.NoEvenement) {
            return res.status(400).json({ message: 'Un ou des paramètres du body sont manquants', success: false });
        }

        const arme = await db.getArmeById(req.params.idArme);
        if (!arme.length) {
            return res.status(404).json({ message: 'L\'arme n\'existe pas dans la base de données', success: false });
        }
        await db.updateArme(req.body, req.params.idArme);
        return res.status(200).json({ message: 'L\'arme a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour supprimer une arme
router.delete('/:idArme', async (req, res) => {
    try {
        if (!req.params.idArme) {
            return res.status(400).json({ message: 'Le paramètre "idArme" est manquant', success: false });
        }
        const arme = await db.getArmeById(req.params.idArme);
        if (!arme.length) {
            return res.status(404).json({ message: 'Aucune donnée a été trouvée', success: false });
        }
        await db.deleteArme(req.params.idArme);
        return res.status(200).json({ message: 'L\'arme a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Exporter le router.
module.exports = router;
