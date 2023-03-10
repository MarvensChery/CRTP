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

// Route pour GET l'ippe par idPersonne et idIPPE
router.get('/infoPersonne/:IdPersonne/:IdIPPE', async (req, res) => {
    let resultat;
    const { IdPersonne } = req.params;
    const { IdIPPE } = req.params;
    if (IdPersonne === undefined && IdIPPE === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await request.InfoPersonneIppe(IdPersonne, IdIPPE);
        if (resultat.length === 0) {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            return res.status(404).json('Cette personne n\'est pas répertoriée');
        }

        // retourne que les valeurs au client; necessaire a la recherche IPPE
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

// Route sur l'envoie les données pour l'ajout ippe
router.post('/:IdPersonne', async (req, res) => {
    const { IdPersonne } = req.params;
    console.log(IdPersonne);
    const data = req.body.element;
    console.log(data);  
    if (data == null) {
        return res.status(400).json({ success: false, message: 'données manquantes' });
    }

    const id = await request.AjoutReponse(IdPersonne, data, res);
    return res.status(200).json({
        message: 'IPPE ajouté',
        IdPersonne: id,
    });
});

// Route pour la modification d'un ippe
router.put('/:IdPersonne/:IdIPPE', async (req, res) => {
    const { IdIPPE } = req.params;
    const { tableIPPE } = req.body.element;
    console.log(req.body);
    console.log(tableIPPE);

    if (req.body) {
        if (tableIPPE) {
            try {
                await request.modifiertableIppe(IdIPPE, tableIPPE);
            } catch (error) {
                return res.status(500).json({ success: false, message: 'réponse  non modifiée' });
            }
        }
        return res.status(200).json({ success: true, message: 'réponse modifiée' });
    }
    return res.status(400).json({ success: false, message: "manque d'élément à modifier" });
});

// Route pour la suppression d'un ippe
router.delete('/:IdPersonne/:IdIPPE', async (req, res) => {
    const { IdPersonne } = req.params;
    const { IdIPPE } = req.params;
    console.log(req.params);
    if (req.params.IdPersonne == null || req.params.IdIPPE == null) {
        return res.status(400).json({ success: false, message: 'identifiant manquant' });
    }
    const deleteReponse = await request.deleteResponse(IdPersonne, IdIPPE, res);
    return deleteReponse;
});

// Route pour GET l'ippe par idPersonne et idIPPE
router.get('/infoPersonne/:IdPersonne/:IdIPPE', async (req, res) => {
    let resultat;
    const { IdPersonne } = req.params;
    const { IdIPPE } = req.params;
    if (IdPersonne === undefined && IdIPPE === undefined) {
        return res.status(400).json('paramètre manquant');
    }
    try {
        resultat = await request.InfoPersonneIppe(IdPersonne, IdIPPE);
        if (resultat.length === 0) {
            // retourne la valeur negative si la personne na pas de fichier IPPE
            return res.status(404).json('Cette personne n\'est pas répertoriée');
        }

        // retourne que les valeurs au client; necessaire a la recherche IPPE
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;
