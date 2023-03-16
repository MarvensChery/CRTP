const express = require('express');

const jwt = require('jsonwebtoken');

const request = require('../database/utilisateurs');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getUtilisateursAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { identifiant, motDePasse, studentOrProf } = req.body;
        resultat = await request.connexion(identifiant, motDePasse, studentOrProf);
    } catch (error) {
        res.status(500).json(error);
    }

    if (resultat.length === 0) {
        // envoi du message contenant les information pour le login
        /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */

        return res.status(404).json({ succes: false });
    }
    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat[0].Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    return res.status(200).json({
        succes: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

router.post('/inscription', async (req, res) => {
    
    try{
        let salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.motDePasse, salt);
        await request.insertUser(req.body.identifiant,password,req.body.Etudiant,req.body.NomFamille);
        res.status(201).send();
    } catch {
        res.status(401).send();
    }
});

router.post('/update'){
    let passwords = await request.getPasswords();
    for (i=0;i<passwords.length;i++){
        let unHashedPassword = passwords[i].MotDePasse
        let salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(unHashedPassword,salt);
        await request.updatePassword(passwords[i].Identifiant,hashedPassword)
    };
};



module.exports = router;
