/* eslint-disable linebreak-style */
/* eslint-disable no-tabs */
/* eslint-disable max-len */
const express = require('express');

const request = require('../database/requetesKnex');

const router = express.Router();

router.get('/:idArme', async (req, res) => {
    try {
        let data;
        if (req.params.idArme !== undefined) data = await request.getDataById('IBAF', req.params.idArme);
        else data = await request.getData('IBAF');
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé' });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await request.getData('IBAF');
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé' });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.post('/', async (req, res) => {
    // choix des infos a envoyer selon la banque de données choisi
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.calibre === undefined
			|| req.body.typeAr === undefined || req.body.NoEvenement === undefined || req.body.resIBAF === undefined) return res.status(400).json('paramètre manquant');
        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getDataByNoEvent('IBAF', req.body.NoEvenement);
        // si oui renvoyer une errer
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée' });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Calibre: req.body.calibre,
            TypeArme: req.body.typeAr,
            NoEvenement: req.body.NoEvenement,
        };
            // ajout de données
        await request.addData('IBAF', DataToSend);
        // avoir le id de la nouvelle entité
        const Data = await request.getDataByNoEvent('IBAF', req.body.NoEvenement);
        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé' });
        return res.status(200).json({ message: `L’entité a été ajoutée avec succès Id: ${Data[0].IdIBAF}` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// route pour modifier les donnees dans la base
router.put('/:idArme', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.calibre === undefined
            || req.body.typeAr === undefined || req.body.resIBAF === undefined || req.body.NoEvenement === undefined) return res.status(400).json('paramètre manquant');

        // verifier si l'entite est deja dans la base de donnees
        const DataAdd = await request.getDataById('IBAF', req.params.idArme);
        // si non renvoye une errer
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée' });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Calibre: req.body.calibre,
            TypeArme: req.body.typeAr,
            NoEvenement: req.body.NoEvenement,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
        await request.updateData('IBAF', DataToSend, req.params.idArme);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// route pour delete l'entité
router.delete('/:idArme', async (req, res) => {
    let data;
    try {
        data = await request.getDataById('IBAF', req.params.idArme);
        if (data.length === 0) {
            // retourne message d'errer
            return res.status(404).json({ message: 'aucune donnée trouvé' });
        }

        await request.deleteData('IBAF', req.params.idArme);
        // retourne une confirmation
        return res.status(200).json({ message: 'l\'objet a bien été supprimé' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
