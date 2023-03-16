const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const request = require('../database/utilisateurs');

const secret = 'dgjkgevuyetggvdghdfhegchgjdg,dvbmdghkdvghmdvhmshmg';
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
router.post('/inscription/', async (req, res) => {
    //  Creation d'un utilisateur
    const {
        identifiant, motDePasse, studentOrProf, NomFamille,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExists = await request.getUtilisateurById('SELECT * FROM Utilisateurs WHERE idUtilisateur = $1', [identifiant]);
    if (userExists.rows.length > 0) {
        return res.status(409).json({ message: 'Utilisateur existe deja' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Insérer l'utilisateur en base de données
    const result = await request.insertUtilisateurs(
        'INSERT INTO Utilisateurs(identifiant, studentOrProf, NomFamille, hashedPassword) VALUES ($1, $2, $3, $4) RETURNING idUtilisateur',
        [identifiant, studentOrProf, NomFamille, hashedPassword],
    );

    // Créer un jeton pour l'utilisateur
    const token = jwt.sign({ id: result.rows[0].idUtilisateur }, secret, { expiresIn: '24h' });

    // Retourner les informations de l'utilisateur (sauf le mot de passe) et le jeton
    const utilisateur = {
        id: result.rows[0].idUtilisateur,
        identifiant,
        studentOrProf,
        NomFamille,
    };
    return res.status(201).json({ utilisateur, token });
});

module.exports = router;
