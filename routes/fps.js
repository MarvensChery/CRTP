/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
const express = require('express');

const request = require('../database/fps');

const router = express.Router();

const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    let resultat;
    try {
        resultat = await request.getFps();
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
    if (resultat.length === 0) {
        return res.status(404).json({ message: "L'information n'existe pas dans la base de donnée !", success: false });
    }
    return res.status(200).json(resultat);
});

// Route pour récupérer un fps selon l'id
router.get('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    let resultat;

    if(!isNaN(idFps)){
    try {
        resultat = await request.getFps(idFps);
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
    if (resultat.length === 0) {
        return res.status(404).json({ message: "L'information n'existe pas dans la base de donnée !", success: false });
    }
    return res.status(200).json(resultat);
    }else{
        res.status(400).json({message: "Bad request", success: false})
    }
});

router.get('/personnes/:idPersonne/fps', async (req, res) => {
    const IdPersonne = req.params;
    let resultat;

    if(!isNaN(IdPersonne)){
    try {
        resultat = await request.getPersonnesFps(IdPersonne.idPersonne);
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
    if (resultat.length === 0) {
        return res.status(404).json({ message: "L'information n'existe pas dans la base de donnée !", success: false });
    }
    return res.status(200).json(resultat);
}else{
    res.status(400).json({message: "Bad request", success: false})
}
});

// Route pour ajouter un fps
router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const DateMesure = new Date().toJSON().slice(0, 10);
    let inserted
    const {
        IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;

    const data = {IdPersonne, NoFPS, DateMesure, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction}

    const description = {
        Race, Taille, Poids,
        Yeux, Marques
    }
    try {
        inserted = await request.addFps(data);
        await request.updateDescription(description, IdPersonne);
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }

    return res.status(200).json(inserted);
});
// Route pour modifier un fps selon l'id
router.put('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;
    let updated;

    if(!isNaN(idFps)){
    const {
        IdPersonne, NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction, Race, Taille, Poids,
        Yeux, Marques,
    } = req.body;

    const data = {NoFPS, Violent, CD,
        Echappe, Suicidaire, Desequilibre,
        Contagieux, Violence, Fraude,
        ConduiteVehicule, IntroEffraction, Sexe, ArmeOffensive, Vol,
        Drogue, Mefait, Incendie, AutreInfraction}

    const description = {
            Race, Taille, Poids,
            Yeux, Marques
        }

    try {
        updated = await request.updateFps(data, idFps, IdPersonne);

        await request.updateDescription(description, IdPersonne);
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
    if(updated.length == 1){
        return res.status(200).json(updated);
    }else if(updated.length == 0){
        return res.status(404).json({message: 'aucun fps trouvé'})
        }
}else{
    res.status(400).json({message: "Bad request", success: false})
}
});
// Route pour supprimer un fps selon l'id
router.delete('/:idFps', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    const { idFps } = req.params;

    if(!isNaN(idFps)){
    try {
        const del = await request.deleteFps(idFps);
        if(del == 1){
            return res.status(200).json({ message: 'le fps a bien été supprimé', success: true });
        }else if(del == 0){
            return res.status(404).json({message: 'aucun objet trouvé', success: false })
            }
    } catch (error) {
        res.status(500).json({message: error.message, success: false});
    }
}else{
    res.status(400).json({message: "Bad request", success: false })
}

});

module.exports = router;
