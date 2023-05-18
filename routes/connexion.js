const express = require('express');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs');
const db = require('../database/utilisateurs');

const router = express.Router();

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    try {
        res.header('Access-Control-Allow-Origin', '*');
        const { Identifiant, MotDePasse } = req.body;
        const utilisateur = await db.getUtilisateurByIdentifiant(Identifiant);
        if (!utilisateur) {
            return res.status(404).json({ message: 'Identifiant incorrect' });
        }
        if (!bcrypt.compareSync(MotDePasse, utilisateur.MotDePasse)) {
            return res.status(404).json({ message: 'Mot de passe incorrect' });
        }
        const expiresIn = 14400;

        const accessToken = jwt.sign(
            { identifiant: utilisateur.Identifiant },
            process.env.TOKEN_KEY,
            { expiresIn },
        );
        return res.status(200).json({
            Etudiant: utilisateur.Etudiant,
            Matricule: utilisateur.Identifiant,
            token: accessToken,
            expires_in: expiresIn,
        });
    } catch (error) { return res.status(500).json({ message: error.message }); }
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
