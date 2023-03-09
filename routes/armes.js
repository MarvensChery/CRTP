const express = require('express');

const request = require('../database/armes');

const router = express.Router();
// Requête pour obtenir une arme avec son id.
router.get('/:idArme', async (req, res) => {
    try {
        let data;
        if (req.params.idArme) data = await request.getArmeById(req.params.idArme);
        else return res.status(400).json({ message: 'Le paramètre "idArme" est manquant', success: false });
        if (data.length === 0) {
            return res.status(404).json({ message: `${req.params.idArme} ne correspond à aucune idArme dans la base de données`, success: false });
        }
        return res.status(200).json(data);// yahoo
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour obtenir toutes les armes
router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const data = await request.getArmesAll();
        if (data.length === 0) {
            return res.status(404).json({ message: 'Aucune donnée a été trouvée', success: false });
        }
        return res.status(200).json(data);// yahoo
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour insérer une arme
router.post('/', async (req, res) => {
    try {
        if (!req.body.NoSerie || !req.body.marque || !req.body.calibre || !req.body.typeAr || !req.body.NoEvenement) return res.status(400).json({ message: 'paramètre manquant', success: false });
        // Vérifier si l'arme est déjà dans la base de donnees.
        const DataAdd = await request.getArmeByNoEvenement(req.body.NoEvenement);
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'L\'arme se trouve déja dans la base de données', success: false });
        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Calibre: req.body.calibre,
            TypeArme: req.body.typeAr,
            NoEvenement: req.body.NoEvenement,
        };
            // ajout de données
        await request.postArme(DataToSend);
        // avoir le id de la nouvelle entité.
        const Data = await request.getArmeByNoEvenement(req.body.NoEvenement);
        if (Data.length === 0) return res.status(404).json({ message: 'Aucune a été donnée trouvée', success: false });
        return res.status(200).json({ message: `L'arme a été ajoutée avec succès Id: ${Data[0].IdIBAF}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour modifier une arme
router.put('/:idArme', async (req, res) => {
    try {
        if (!req.body.NoSerie || !req.body.marque || !req.body.calibre || !req.body.typeAr || !req.body.NoEvenement) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // Vérifier si l'arme est dans la base de donnees.
        const DataAdd = await request.getArmeById(req.params.idArme);
        if (DataAdd.length === 0) return res.status(404).json({ message: 'L\'arme n\'existe pas dans la base de données', success: false });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Calibre: req.body.calibre,
            TypeArme: req.body.typeAr,
            NoEvenement: req.body.NoEvenement,
        };
        await request.updateArme(DataToSend, req.params.idArme);
        return res.status(200).json({ message: 'L\'entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Requête pour supprimer une arme
router.delete('/:idArme', async (req, res) => {
    let data;
    try {
        data = await request.getArmeById(req.params.idArme);
        if (data.length === 0) {
            return res.status(404).json({ message: 'Aucune donnée a été trouvée', success: false });
        }

        await request.deleteArme(req.params.idArme);
        return res.status(200).json({ message: 'L\'arme a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// Exporter le router.
module.exports = router;
