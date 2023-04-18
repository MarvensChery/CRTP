/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
const express = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

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
    let bool;
    try {
        const { identifiant, motDePasse, studentOrProf } = req.body;
        resultat = await request.connexion(identifiant, motDePasse, studentOrProf);
        bool = bcrypt.compareSync(req.body.MotDePasse, resultat.MotDePasse);
        if (bool === false) {
            res.status(400).send('Mot de Passe est invalide');
        }
    } catch (error) {
        res.status(500).json(error);
    }

    if (bool === true) {
        // envoi du message contenant les information pour le login
        /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */

        return res.status(404).json({ succes: false });
    }
    const expiresIn = 14400;
    const accessToken = jwt.sign({ identifiant: resultat[0].Identifiant }, process.env.TOKEN_KEY, {
        expiresIn,
    });
    res.json({ accessToken });

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
    try {
        const salt = bcrypt.genSalt();
        const password = bcrypt.hash(req.body.motDePasse, salt);
        await request.insertUser(req.body.identifiant, password, req.body.Etudiant, req.body.NomFamille);
        res.status(201).send();
    } catch {
        res.status(401).send();
    }
});

// eslint-disable-next-line no-unused-vars
router.post('/update', async (req, res) => {
    const passwords = await request.getPasswords();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < passwords.length; i++) {
        const unHashedPassword = passwords[i].MotDePasse;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(unHashedPassword, salt);
        await request.updatePassword(passwords[i].Identifiant, hashedPassword);
    }
});

module.exports = router;
