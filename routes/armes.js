/* eslint-disable no-tabs */
/* eslint-disable max-len */
const express = require('express');

const request = require('../database/armes');

const router = express.Router();
// Requete pour obtenir idArme.
router.get('/:idArme', async (req, res) => {
    try {
        let data;
        if (req.params.idArme !== undefined) data = await request.getArmeById(req.params.idArme);
        else return res.status(400).json({ message: 'Paramètre manquant', success: false });
        if (data.length === 0) {
            // retourne la valeur negative.
            return res.status(404).json({ message: 'Aucune donnée trouvée', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
// Requete pour obtenir les valeurs et retourne valeur.
router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const data = await request.getArmesAll();
        if (data.length === 0) {
            // retourne la valeur negative.
            return res.status(404).json({ message: 'Aucune donnée trouvée', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
// Requete pour choix des informations selon la banque de donnees.
router.post('/', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.calibre === undefined
			|| req.body.typeAr === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'Paramètre manquant', success: false });
        // verifie si l'entite a ajouter existe deja dans la base de donnees.
        const DataAdd = await request.getArmeByNoEvenement(req.body.NoEvenement);
        // si oui renvoyer une erreur.
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'L\'entité se trouve déjà dans la base de données', success: false });
        // si non ajouter l'entite.
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
        if (Data.length === 0) return res.status(404).json({ message: 'Aucune donnée trouvée', success: false });
        return res.status(200).json(Data[0].IdIBAF);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour modifier les donnees dans la base.
router.put('/:idArme', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.calibre === undefined
            || req.body.typeAr === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'Paramètre manquant', success: false });

        // verifier si l'entite est deja dans la base de donnees.
        const DataAdd = await request.getArmeById(req.params.idArme);
        // si non renvoye une erreur
        if (DataAdd.length === 0) return res.status(404).json({ message: 'L\'entité n\'existe pas dans la base de données', success: false });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Calibre: req.body.calibre,
            TypeArme: req.body.typeAr,
            NoEvenement: req.body.NoEvenement,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update.
        await request.updateArme(DataToSend, req.params.idArme);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour delete l'entité.
router.delete('/:idArme', async (req, res) => {
    let data;
    try {
        data = await request.getArmeById(req.params.idArme);
        if (data.length === 0) {
            // retourne message d'erreur.
            return res.status(404).json({ message: 'Aucune donnée trouvée', success: false });
        }

        await request.deleteArme(req.params.idArme);
        // retourne une confirmation.
        return res.status(200).json({ message: 'L\'objet a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});
// exporte le module.
module.exports = router;
