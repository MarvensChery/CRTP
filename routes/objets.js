/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const request = require('../database/objets');

const router = express.Router();
// Requete pour obtenir le noserie et retourne valeurs.
router.get('/numSerie/:numSerie', async (req, res) => {
    const { numSerie } = req.params;
    let data;

    if (numSerie) {
        try {
            data = await request.getObjetByNumSerie(numSerie);
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

// Requete pour obtenir idObjet et retourne valeurs.
router.get('/:idObjet', async (req, res) => {
    const { idObjet } = req.params;
    let data;

    if (!Number.isNaN(idObjet)) {
        try {
            if (idObjet !== undefined) data = await request.getObjetById(idObjet);
            else return res.status(400).json({ message: 'paramètre manquant', success: false });
            if (data.length === 0) {
            // retourne la valeur negative
                return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
            }
            // retourne que les valeurs au client;
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Bad request', success: false });
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
    const { NoSerie } = req.body;
    const Marque = req.body.marque;
    const Modele = req.body.modele;
    const TypeObjet = req.body.typeOb;
    const { NoEvenement } = req.body;
    try {
        if (NoSerie === undefined || Marque === undefined || Modele === undefined
			|| TypeObjet === undefined || NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });
        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getObjetByNoEvenement(req.body.NoEvenement);
        // si oui renvoyer une erreur
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée', success: false });

        const DataToSend = {
            NoSerie, Marque, Modele, TypeObjet, NoEvenement,
        };
            // ajout de données
        await request.postObjet(DataToSend);
        // avoir le id de la nouvelle entité
        const Data = await request.getObjetByNoEvenement(req.body.NoEvenement);
        console.log(Data);
        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        return res.status(200).json({ message: `L’entité a été ajoutée avec succès Id: ${Data[0].IdIBOB}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour modifier les donnees dans la base
router.put('/:idObjet', async (req, res) => {
    const { NoSerie } = req.body;
    const Marque = req.body.marque;
    const Modele = req.body.modele;
    const TypeObjet = req.body.typeOb;
    const { NoEvenement } = req.body;
    const { idObjet } = req.params;

    if (!Number.isNaN(idObjet)) {
        try {
            if (!NoSerie || !Marque || !Modele || !TypeObjet || !NoEvenement) return res.status(400).json({ message: 'paramètre manquant', success: false });

            const DataToSend = {
                NoSerie, Marque, Modele, TypeObjet, NoEvenement,
            };

            // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
            const updated = await request.updateObjet(DataToSend, idObjet);
            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Bad request', success: false });
    }
});

// route pour delete l'entité
// eslint-disable-next-line consistent-return
router.delete('/:idObjet', async (req, res) => {
    const { idObjet } = req.params;

    if (!Number.isNaN(idObjet)) {
        try {
            const del = await request.deleteObjet(idObjet);
            // retourne une confirmation
            if (del === 1) {
                return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
            } if (del === 0) {
                return res.status(404).json({ message: 'aucun objet trouvé' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message, success: false });
        }
    } else {
        return res.status(400).json({ message: 'Bad request', success: false });
    }
});

module.exports = router;
