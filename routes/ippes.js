const express = require('express');

const request = require('../database/ippes');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getIppesAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.get('/info', async (req, res) => {
    let resultat;

    const { nomFamille, prenom1 } = req.query;
    const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
    const masculin = (req.query.masculin === 'true');
    const { dateNaissance } = req.query;

    if (nomFamille === undefined || prenom1 === undefined || prenom2 === undefined
        || masculin === undefined || dateNaissance === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await request.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        return res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        return res.status(404).json('Cette personne n\'est pas répertoriée');
    }

    return res.status(200).json(resultat);
});

router.get('/event', async (req, res) => {
    try {
        // requetes:
        // trouver une personne a partir du num event
        console.log('test');
        console.log(req.query.noEvent);

        const pers = (await request.chercherPersonne(req.query.noEvent))[0];
        console.log('done');

        console.log(pers);

        // trouver un event a partir de son noEvent
        const event = (await request.chercherEvent(req.query.noEvent))[0];
        console.log(event);
        if (!event || !pers) {
            return res.status(404);
        }
        // trouver les conditions d'un evenement a partir de son noEvent
        const conditions = await request.chercherConditions(req.query.noEvent);
        console.log(conditions);
        const data = {
            type: event.TypeEvenement,
            personne: {
                nomFamille: pers.NomFamille,
                prenom1: pers.Prenom1,
                prenom2: pers.Prenom2,
                sex: pers.Masculin,
                date: pers.DateNaissance,
            },
            mandat: event.Mandat,
            Cour: event.Cour,
            noMandat: event.NoMandat,
            natCrime: event.NatureCrime,
            conditions,
        };
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        return res.status(404).json(error);
    }
});
//
// route to update an IPPE
router.put('/:idIppe', async (req, res) => {
    try {
        const {
            NoEvenement,
            TypeEvenement,
            Mandat,
            Motif,
            Nature,
            DossierEnquete,
            Cour,
            NoMandat,
            NoCause,
            IdNatureCrime,
            LieuDetention,
            FinSentence,
            VuDerniereFois,
            AgentProbation,
            AgentLiberation,
            Telephone,
            Poste,
        } = req.body;

        const erreur = await request.updateIppe({
            NoEvenement,
            TypeEvenement,
            Mandat,
            Motif,
            Nature,
            DossierEnquete,
            Cour,
            NoMandat,
            NoCause,
            IdNatureCrime,
            LieuDetention,
            FinSentence,
            VuDerniereFois,
            AgentProbation,
            AgentLiberation,
            Telephone,
            Poste,
        }, req.params.idIppe);
        if (erreur) {
            return res.status(404).json(erreur);
        }
        return res.status(200).json('updated');
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.delete('/:idIppe', async (req, res) => {
    try {
        const resultat = await request.deleteIPPE(req.params.idIppe);
        if (resultat) {
            return res.status(404).json(resultat);
        }
        return res.status(200).json('deleted');
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
