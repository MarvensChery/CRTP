const express = require('express');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const request = require('../database/utilisateurs');

const router = express.Router();

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
