/* eslint-disable max-len */
const express = require('express');

const request = require('../database/valeurs');
const { testRegex } = require('../fonctionReutilisable');

const router = express.Router();
<<<<<<< HEAD
// Requete pour obtenir idValeur et retourn valeur.
router.get('/:idValeur', async (req, res) => {
    try {
        let data;
        if (req.params.idValeur !== undefined) data = await request.getDataById(req.params.idValeur);
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
});

router.get('/', async (req, res) => {
    try {
        const data = await request.getValeursAll();
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
        if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
            || req.body.resIBVA === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getDataByNoEvenement(req.body.NoEvenement);
        // si oui renvoyer une erreur
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée', success: false });

        const DataToSend = {
            Identifiant: req.body.NoSerie,
            Auteur: req.body.auteur,
            TypeValeur: req.body.typeVa,
            TypeEvenement: req.body.resIBVA,
            NoEvenement: req.body.NoEvenement,
        };
            // ajout de données
        await request.postValeur(DataToSend);
        // avoir le id de la nouvelle entité
        const Data = await request.getDataByNoEvenement(req.body.NoEvenement);
        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        return res.status(200).json({ message: `L’entité a été ajoutée avec succès Id: ${Data[0].IdIBVA}`, success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour modifier les donnees dans la base
router.put('/:idValeur', async (req, res) => {
    try {
        if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
            || req.body.resIBVA === undefined || req.body.NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // verifier si l'entite est deja dans la base de donnees
        const DataAdd = await request.getDataById(req.params.idValeur);
        // si non renvoye une erreur
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée', success: false });

        const DataToSend = {
            Identifiant: req.body.NoSerie,
            Auteur: req.body.auteur,
            TypeValeur: req.body.typeVa,
            TypeEvenement: req.body.resIBVA,
            NoEvenement: req.body.NoEvenement,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
        await request.updateValeur(DataToSend, req.params.idValeur);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour delete l'entité
router.delete('/:idValeur', async (req, res) => {
    let data;
    try {
        data = await request.getDataById(req.params.idValeur);
        if (data.length === 0) {
            // retourne message d'erreur
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }

        await request.deleteData(req.params.idValeur);
        // retourne une confirmation
        return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
=======

// eslint-disable-next-line consistent-return
function errorNumEvent(validationEvent, res) {
    if (validationEvent === false) {
        return res.status(400).json({ message: 'Numéro d\'événement invalide' });
    }
}

router.get('/:idValeur', async (req, res) => {
    let resultat;
    const id = req.params.idValeur;
    try { // Si le numéro d'événement est valide
        if (id === undefined) { // Si le numéro d'événement est vide
            return res.status(400).json({ message: 'Paramètre manquant' });
        }
        resultat = await request.getIBVAbyId(id); // Récupération de la valeur IBVA
        if (resultat.length === 0) { // Si la valeur IBVA n'existe pas
            return res.status(404).json({ message: 'Cette valeur n\'est pas répertoriée' });
        }
        return res.status(200).json(resultat); // Retourne la valeur IBVA
    } catch (error) { // Si le numéro d'événement est invalide
        return res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const {
        identifiant, auteur, typeValeur, typeEvenement,
    } = req.body; // Récupération des données du formulaire
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Création du numéro d'événement
    const validationEvent = testRegex( // Vérification du numéro d'événement
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res); // Si le numéro d'événement est invalide
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Si les données sont manquantes
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try { // Si le numéro d'événement est valide
        const resultatRequete = await // Récupération de la valeur IBVA
        request.ajoutIBVA(identifiant, auteur, typeValeur, typeEvenement, noEvenement);
        if (resultatRequete === true) { // Si la valeur IBVA a été ajoutée
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(500).json({ // Si la valeur IBVA n'a pas été ajoutée
            success: false,
            message: 'Une erreur est survenue, l\'identifiant existe déjà dans la base de données.',
        });
    } catch (error) {
        return res.status(500).json({ // Si le numéro d'événement est invalide
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée, ${error.message}`,
        });
    }
});

router.put('/', async (req, res) => {
    const {
        idValeur, identifiant, auteur, typeValeur, typeEvenement,
    } = req.body; // Récupération des données du formulaire
    const noEvenement = `${req.body.NoCours}-${req.body.AA}${req.body.MM
    }${req.body.JJ}-${req.body.sequenceChiffres}`; // Création du numéro d'événement
    const validationEvent = testRegex( // Vérification du numéro d'événement
        req.body.JJ,
        req.body.MM,
        req.body.AA,
        req.body.sequenceChiffres,
    );
    errorNumEvent(validationEvent, res); // Si le numéro d'événement est invalide
    if (identifiant === undefined || auteur === undefined || typeValeur === undefined
        || typeEvenement === undefined || req.body.NoCours === undefined) {
        return res.status(400).json({ // Si les données sont manquantes
            success: false,
            message: 'Valeur manquant(es)',
        });
    }
    try {
        const resultatRequete = await
        request.modificationIBVA(
            idValeur,
            identifiant,
            auteur,
            typeValeur,
            typeEvenement,
            noEvenement,
        ); // Modification de la valeur IBVA
        if (resultatRequete === true) { // Si la valeur IBVA a été modifiée
            return res.status(200).json({
                success: true,
                message: 'L\'action a bien été effectuée',
            });
        }
        return res.status(404).json({ // Si la valeur IBVA n'a pas été modifiée
            success: false,
            message: 'Une erreur est survenue, l\'action n\'a pas été effectuée',
        });
    } catch (error) { // Si le numéro d'événement est invalide
        return res.status(500).json({
            success: false,
            message: `Une erreur est survenue, l'action n'a pas été effectuée: \n${error.message}`,
        });
    }
});

router.delete('/:idValeur', async (req, res) => {
    const id = req.params.idValeur; // Récupération du numéro d'événement
    if (id !== '' || id !== undefined) {
        try {
            const resultatRequete = await request.suppresionIBVAById(id);
            if (resultatRequete === true) { // Si la valeur IBVA a été supprimée
                res.status(200).json({
                    success: true,
                    message: 'L\'élément a bien été supprimé',
                });
            } else {
                res.status(404).json({ // Si la valeur IBVA n'a pas été supprimée
                    success: false,
                    message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
                });
            }
        } catch (err) {
            res.status(400).json({ // Si la valeur IBVA n'a pas été supprimée
                success: false,
                message: `Une erreur est survenue: \n ${err}`,
            });
        }
    } else {
        res.status(500).json({ // Si la valeur IBVA n'a pas été supprimée
            success: false,
            message: 'Une erreur est survenue, l\'élément n\'a pas été supprimé',
        });
>>>>>>> dev
    }
});

module.exports = router;
