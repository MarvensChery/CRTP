const express = require('express');

const jwt = require('jsonwebtoken');

const request = require('../database/utilisateurs');
const bcrypt = require('bcrypt');
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
    
    //  Creation d'un utilisateur
    const {
        Identifiant, MotDePasse, Etudiant, NomFamille,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    console.log(Identifiant,MotDePasse,Etudiant,NomFamille)
    const userExists = await request.getUtilisateurByIdentifiant(Identifiant);
    if (userExists.length > 0) {
        return res.status(409).json({ message: 'Utilisateur existe deja' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(MotDePasse, 10);

    // Insérer l'utilisateur en base de données
    await request.insertUtilisateurs(
        Identifiant, hashedPassword, Etudiant, NomFamille, 
    );

    return res.status(200).json("haha")
});
// connexion d'un utiliisateur
router.post('/connexion', async (req, res) => {
    // Etape 1 à implémenter ici....
    const { Identifiant , MotDePasse } = req.body;
    
  
    //   retrouver  lutilisateur dand la database
    const user = await request.getUtilisateurByIdentifiant(Identifiant);
   

    //   verifie son mdp
    if (user.length > 0) {    
      const isMatch = await bcrypt.compare(MotDePasse, user[0].MotDePasse);
      if (isMatch) {
        //   cree le token avec une cle secret
        const token = jwt.sign({ id: user[0].IdUtilisateur }, process.env.TOKEN_KEY, { expiresIn: '24h' });
        return res.status(200).json({ token });
      } else {
        return res.status(401).json({ message: 'Invalid password or identifiant' });
      }
    } else {
        return res.status(404).json({ message: 'Invalid password or identifiant' });
    }
  });


// route pour delete l'entité.
router.delete('/delete/:IdUtilisateur', async (req, res) => {
    let data;
    try {
        data = await request.getUtilisateurById(req.params.IdUtilisateur);
        if (data.length === 0) {
            // retourne message d'erreur.
            return res.status(404).json({ message: 'aucune donnée trouvé', success: false });
        }

        await request.deleteUtilisateurs(req.params.IdUtilisateur);
        // retourne une confirmation.
        return res.status(200).json({ message: 'l\'objet a bien été supprimé', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

// update user
router.put('/update/:IdUtilisateur', async (req, res) => {
    try {
        if ( req.body.Identifiant === undefined || req.body.MotDePasse === undefined
            || req.body.Etudiant === undefined || req.body.NomFamille === undefined) return res.status(400).json({ message: 'paramètre manquant', success: false });

        // verifier si l'entite est deja dans la base de donnees.
        const DataAdd = await request.getUtilisateurById(req.params.IdUtilisateur);
        // si non renvoye une erreur
        if (DataAdd.length === 0) return res.status(404).json({ message: 'l\'entité n\'existe pas dans la base de donnée', success: false });
        const hashedPassword = await bcrypt.hash(req.body.MotDePasse, 10);
        const DataToSend = {
            
            Identifiant: req.body.Identifiant,
            MotDePasse: hashedPassword,
            Etudiant: req.body.Etudiant,
            NomFamille: req.body.NomFamille,
        };
        // donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update.
        await request.updateUtilisateurs(DataToSend, req.params.IdUtilisateur);
        return res.status(200).json({ message: 'L’entité a été modifié avec succès', success: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, success: false });
    }
});

module.exports = router;
 