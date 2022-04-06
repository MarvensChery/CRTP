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

app.get('/ippeInfo', async (req, res) => {
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

app.get('/banquepersonne', async (req, res) => { // eslint-disable-line
    let resultat;
    try {
        resultat = await request.getPersonnes();
        const resultatformater = [];
        resultat.forEach((element) => {
            resultatformater.push({
                Id: element.IdPersonne,
                NomFamille: element.NomFamille,
                Prenom1: element.Prenom1,
                Prenom2: element.Prenom2,
                Categorie: element.TypePersonne,
            });
        });
        return res.status(200).json(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        return res.status(404).json('La banque est vide');
    }
});

// Ajouter une condition sans paramètre
app.post('/ajoutercondition/:Idpersonne/:Idippe/:Conditions', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterCondition(IdIPPE, Condition, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une victime
app.post('/ajouterconditionvictime/:Idpersonne/:Idippe/:Conditions/:Victime', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { Victime } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecVictime(IdIPPE, Condition, Victime, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une frequentation
app.post('/ajouterconditionfrequentation/:Idpersonne/:Idippe/:Conditions/:Frequentation', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { Frequentation } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecFrequentation(
            IdIPPE,
            Condition,
            Frequentation,
            IdPersonne,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec des heures
app.post('/ajouterconditionheure/:Idpersonne/:Idippe/:Conditions/:HeureDebut/:HeureFin', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        const { HeureDebut } = req.params;
        const { HeureFin } = req.params;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterConditionAvecHeure(
            IdIPPE,
            Condition,
            HeureDebut,
            HeureFin,
            IdPersonne,
        );
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Ajouter une condition avec une adresse
app.post('/ajouterconditionadresse/:Idippe/:Conditions/:Idpersonne/:adresse', async (req, res) => {
    let IdPersonne;
    try {
        const IdIPPE = req.params.Idippe;
        const Condition = req.params.Conditions;
        IdPersonne = req.params.Idpersonne;
        await request.AjouterCondition(IdIPPE, Condition, IdPersonne);
    } catch (error) {
        res.status(500).json(error.message);
    }
    try {
        IdPersonne = req.params.Idpersonne;
        const Adresse1 = req.params.adresse;
        await request.UpdateAdresse(IdPersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec une adresse
app.put('/updateadresse/:Idpersonne/:Adresse1', async (req, res) => {
    let Idpersonne;
    try {
        Idpersonne = req.params.Idpersonne;
        const { Adresse1 } = req.params;
        await request.UpdateAdresse(Idpersonne, Adresse1);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (Idpersonne === 0) {
        return res.status(404).json('error not found');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec une victime
app.put('/updatevictime/:IdCondition/:Victime', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { Victime } = req.params;
        await request.UpdateVictime(IdCondition, Victime);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec des heures
app.put('/updateheure/:IdCondition/:HeureDebut/:HeureFin', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { HeureDebut } = req.params;
        const { HeureFin } = req.params;
        await request.UpdateHeure(IdCondition, HeureDebut, HeureFin);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Update une condition avec une frequentation
app.put('/updatefrequentation/:IdCondition/:Frequentation', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const { Frequentation } = req.params;
        await request.UpdateFrequentation(IdCondition, Frequentation);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Supprimer une condition
app.delete('/deletecondition/:IdCondition', async (req, res) => {
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        await request.DeleteCondition(IdCondition);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }

    return res.status(200).json({
        succes: true,
    });
});

// Retourner la condition
app.get('/returncondition/:IdCondition', async (req, res) => { // eslint-disable-line
    let IdCondition;
    try {
        IdCondition = req.params.IdCondition;
        const resultat = await request.ReturnCondition(IdCondition);
        const resultatformater = [];
        resultat.forEach((element) => {
            resultatformater.push({
                Id: element.IdCondition,
                IdIPPE: element.IdIPPE,
                IdPersonne: element.IdPersonne,
                Libelle: element.Libelle,
                HeureDebut: element.HeureDebut,
                HeureFin: element.HeureFin,
                Victime: element.Victime,
                Frequentation: element.Frequentation,
            });
        });
        res.send(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdCondition === 0) {
        return res.status(404).json('error');
    }
});

// Retourner la personne
app.get('/returnpersonne/:IdPersonne', async (req, res) => { // eslint-disable-line
    let IdPersonne;
    try {
        IdPersonne = req.params.IdPersonne;
        const resultat = await request.ReturnPersonne(IdPersonne);
        const resultatformater = [];
        resultat.forEach((element) => {
            resultatformater.push({
                Id: element.IdPersonne,
                Adresse1: element.Adresse1,
            });
        });
        res.send(resultatformater);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (IdPersonne === 0) {
        return res.status(404).json('error');
    }
});

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
