const express = require('express');

const app = express();
const cors = require('cors');
const request = require('./requetesKnex');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        const { identifiant, motDePasse } = req.body;
        resultat = await request.connexion(identifiant, motDePasse);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        // envoi du message contenant les information pour le login
        /** ** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN**** */

        return res.status(404).json({ succes: false });
    }

    return res.status(200).json({
        succes: true,
        Etudiant: resultat[0].Etudiant,
        Matricule: resultat[0].Identifiant,
        Nom: resultat[0].NomFamille,
    });
});

// app.get('/ippeInfo', async (req, res) => {
//     let resultat;

//     try {
//         const { nomFamille, prenom1 } = req.query;
//         const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
//         const masculin = (req.query.masculin === 'true');
//         const { dateNaissance } = req.query;
//         resultat = await request.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }

//     if (resultat.length === 0) {
//         res.send({ result: 'Negatif' });
//     } else {
//         res.send(resultat);
//     }
// });

app.get('/ippeInfo', async (req, res) => {
    //?nomFamille=Levasseur&prenom1=Marc&prenom2=&masculin=true&dateNaissance=1971-11-07T00:00:00.000Z
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


app.get('/banquepersonne', async (req, res) => {
    try {
        let resultat = await request.getPersonnes();
        let resultatformater = []
        resultat.forEach(element => {
            resultatformater.push({
                Id: element.IdPersonne,
                NomFamille: element.NomFamille,
                Prenom1: element.Prenom1,
                Prenom2: element.Prenom2,
                Categorie: element.TypePersonne})
        });
        res.send(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
