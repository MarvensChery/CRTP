/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
/* eslint-disable no-tabs */
const express = require('express');

const request = require('../database/objets');

const router = express.Router();
// Requete pour obtenir idObjet et retourne valeurs.
router.get('/:idObjet', async (req, res) => {
    const idObjet = req.params.idObjet
    let data;

    if(!isNaN(idObjet)){
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
}else{
    res.status(400).json({message: "Bad request", success: false })
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
    const NoSerie = req.body.NoSerie;
    const Marque = req.body.marque;
    const Modele = req.body.modele;
    const TypeObjet = req.body.typeOb;
    const NoEvenement = req.body.NoEvenement;
    try {
        if (NoSerie === undefined || Marque === undefined || Modele === undefined
			|| TypeObjet === undefined || NoEvenement === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });
        // verifie si l'entite a ajouter existe deja dans la base de donnees
        const DataAdd = await request.getObjetByNoEvenement(req.body.NoEvenement);
        // si oui renvoyer une erreur
        if (DataAdd.length !== 0) return res.status(404).json({ message: 'l\'entité se trouve déja dans la base de donnée', success: false });

        const DataToSend = {NoSerie, Marque, Modele, TypeObjet, NoEvenement,};
            // ajout de données
        const inserted = await request.postObjet(DataToSend);

        if (Data.length === 0) return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        return res.status(200).json(inserted);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// route pour modifier les donnees dans la base
router.put('/:idObjet', async (req, res) => {
    const NoSerie = req.body.NoSerie;
    const Marque = req.body.marque;
    const Modele = req.body.modele;
    const TypeObjet = req.body.typeOb;
    const NoEvenement = req.body.NoEvenement;
    const idObjet = req.params.idObjet

    if(!isNaN(idObjet)){
    try {
        if (!NoSerie || !Marque || !Modele || !TypeObjet || !NoEvenement) return res.status(400).json({ message: 'paramètre manquant', success: false });

        let DataToSend = {NoSerie, Marque, Modele, TypeObjet, NoEvenement};

        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
        const updated = await request.updateObjet(DataToSend, idObjet);
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}else{
    res.status(400).json({message: "Bad request", success: false })
}
});

// route pour delete l'entité
router.delete('/:idObjet', async (req, res) => {
    const idObjet = req.params.idObjet

    if(!isNaN(idObjet)){
    try {
        const del = await request.deleteObjet(idObjet);
        // retourne une confirmation
        if(del == 1){
        return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
        }else if(del == 0){
        return res.status(404).json({message: 'aucun objet trouvé'})
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
}else{
    res.status(400).json({message: "Bad request", success: false })
}
});

module.exports = router;
