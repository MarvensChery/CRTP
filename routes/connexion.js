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

router.post('/inscription', async (req, res) => {
    //  Creation d'un utilisateur
    const {
        Identifiant, MotDePasse, Etudiant, NomFamille,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    console.log(Identifiant, MotDePasse, Etudiant, NomFamille);
    const userExists = await request.getUtilisateurByIdentifiant(Identifiant);
    if (userExists.length > 0) {
        return res.status(409).json({ message: 'Utilisateur existe deja' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(MotDePasse, 10);

    // Insérer l'utilisateur en base de données
    await request.insertUtilisateurs(Identifiant, hashedPassword, Etudiant, NomFamille);

    return res.status(200).json('haha');
});
// connexion d'un utiliisateur
router.post('/', async (req, res) => {
    // Etape 1 à implémenter ici....
    const { Identifiant, MotDePasse } = req.body;
    //   retrouver  lutilisateur dand la database
    const user = await request.getUtilisateurByIdentifiant(Identifiant);

    //   verifie son mdp
    if (user.length > 0) {
        const isMatch = await bcrypt.compare(MotDePasse, user[0].MotDePasse);
        if (isMatch) {
        //   cree le token avec une cle secret
            const token = jwt.sign({ id: user[0].IdUtilisateur }, process.env.TOKEN_KEY, { expiresIn: '24h' });
            return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Invalid password or identifiant' });
    }
    return res.status(404).json({ message: 'Invalid password or identifiant' });
});

module.exports = router;
