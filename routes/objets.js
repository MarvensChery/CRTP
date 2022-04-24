/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const request = require('../database/objets');

const router = express.Router();

router.get('/:idObjet', async (req, res) => {
    try {
        let data;
        if (req.params.idObjet !== undefined) data = await request.getDataById(req.params.idObjet);
        else data = await request.getData('IBOB');
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        const data = await request.getObjetsAll();
        if (data.length === 0) {
            // retourne la valeur negative
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }
        // retourne que les valeurs au client;
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

router.post('/', async (req, res) => {
    // choix des infos a envoyer selon la banque de données choisi
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.modele === undefined
			|| req.body.typeOb === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });
        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getDataByNoEvenement(req.body.NoEvenement);
        // si oui renvoyer une errer
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée', success: false });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Modele: req.body.modele,
            TypeObjet: req.body.typeOb,
            NoEvenement: req.body.NoEvenement,
        };
            // ajout de données
        await request.postObjet(DataToSend);
        // avoir le id de la nouvelle entité
        const Data = await request.getDataByNoEvenement(req.body.NoEvenement);
        console.log(Data);
        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        return res.status(200).json({ message: `L’entité a été ajoutée avec succès Id: ${Data[0].IdBOB}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour modifier les donnees dans la base
router.put('/:idObjet', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.modele === undefined
		    || req.body.typeOb === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // verifier si l'entite est deja dans la base de donnees
        const DataAdd = await request.getDataById(req.params.idObjet);
        // si non renvoye une errer
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée', success: false });

        const DataToSend = {
            NoSerie: req.body.NoSerie,
            Marque: req.body.marque,
            Modele: req.body.modele,
            TypeObjet: req.body.typeOb,
            NoEvenement: req.body.NoEvenement,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
        await request.updateObjet(DataToSend, req.params.idObjet);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour delete l'entité
router.delete('/:idObjet', async (req, res) => {
    let data;
    try {
        data = await request.getDataById(req.params.idObjet);
        if (data.length === 0) {
            // retourne message d'errer
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }

        await request.deleteData(req.params.idObjet);
        // retourne une confirmation
        return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
