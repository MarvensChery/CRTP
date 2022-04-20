/* eslint-disable max-len */
const express = require('express');

const request = require('../requetesKnex');

const router = express.Router();

router.get('/:idValeur', async (req, res) => {
    try {
        let data;
        if (req.params.idValeur !== undefined) data = await request.getDataById('IBVA', req.params.idValeur);
        else data = await request.getData('IBVA');
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
        const data = await request.getData('IBVA');
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
        if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
            || req.body.resIBVA === undefined || req.body.NoEvenement === undefined) return res.status(400).json('paramètre manquant');

        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getDataByNoEvent('IBVA', req.body.NoEvenement);
        // si oui renvoyer une errer
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée' });

        const DataToSend = {
            Identifiant: req.body.NoSerie,
            Auteur: req.body.auteur,
            TypeValeur: req.body.typeVa,
            TypeEvenement: req.body.resIBVA,
            NoEvenement: req.body.NoEvenement,
        };
            // ajout de données
        await request.addData('IBVA', DataToSend);
        // avoir le id de la nouvelle entité
        const Data = await request.getDataByNoEvent('IBVA', req.body.NoEvenement);
        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé' });
        return res.status(200).json({ message: `L’entité a été ajoutée avec succès Id: ${Data[0].IdIBVA}` });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// route pour modifier les donnees dans la base
router.put('/:idValeur', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
            || req.body.resIBVA === undefined || req.body.NoEvenement === undefined) return res.status(400).json('paramètre manquant');

        // verifier si l'entite est deja dans la base de donnees
        const DataAdd = await request.getDataById('IBVA', req.params.idValeur);
        // si non renvoye une errer
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée' });

        const DataToSend = {
            Identifiant: req.body.NoSerie,
            Auteur: req.body.auteur,
            TypeValeur: req.body.typeVa,
            TypeEvenement: req.body.resIBVA,
            NoEvenement: req.body.NoEvenement,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
        await request.updateData('IBVA', DataToSend, req.params.idValeur);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// route pour delete l'entité
router.delete('/:idValeur', async (req, res) => {
    let data;
    try {
        data = await request.getDataById('IBVA', req.params.idValeur);
        if (data.length === 0) {
            // retourne message d'errer
            return res.status(404).json({ message: 'aucune donnée trouvé' });
        }

        await request.deleteData('IBVA', req.params.idValeur);
        // retourne une confirmation
        return res.status(200).json({ message: 'l\'objet a bien été supprimé' });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
