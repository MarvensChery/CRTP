const express = require('express');

const app = express();
const cors = require('cors');
const request = require('./requetesKnex');
const { default: knex } = require('knex');

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

    try {
        const { nomFamille, prenom1 } = req.query;
        const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
        const masculin = (req.query.masculin === 'true');
        const dateNaissance = new Date(req.query.dateNaissance);
        resultat = await request.getIPPE(nomFamille, prenom1, prenom2, masculin, dateNaissance);
    } catch (error) {
        res.status(500).json(error.message);
    }

    if (resultat.length === 0) {
        res.send({ result: 'Negatif' });
    } else {
        res.send(resultat);
    }
});


app.get('/voirPersonne', async(req,res) => {
    let resultat;

    try{
        const {IdPersonne} = req.query;
        
        resultat = await request.getPersonne(IdPersonne);
    
     } catch(error){
        res.status(500).json(error.message);
    }

     if (resultat.length === 0) {
        res.send({ result: 'Personne inexistate' });
    } else {
        res.send(resultat);
    }
})

app.post('/creerPersonne', async (req, res) => {

    const TypePersonne = req.body.TypePersonne;
    const NomFamille = req.body.NomFamille;
    const Prenom1 = req.body.Prenom1;
    const Prenom2 = req.body.Prenom2;
    const Masculin = req.body.Masculin;
    const DateNaissance = new Date(req.query.DateNaissance);

    if (!TypePersonne, !NomFamille, !Prenom1, !Prenom2, !Masculin, !DateNaissance) {
        await res.json({success: false, message: 'ce champs ne peut etre vide'});
    }

    try{
        
        await request.postPersonne(TypePersonne,NomFamille,Prenom1,Prenom2,Masculin,DateNaissance);
    
     } catch(error){
        res.status(500).json(error.message);
    }
    
    
   
});

app.put('/updatePersonne', async(req,res)=>{
    const {IdPersonne} = req.query;
    const TypePersonne = req.body.TypePersonne;
    const NomFamille = req.body.NomFamille;
    const Prenom1 = req.body.Prenom1;
    const Prenom2 = req.body.Prenom2;
    const Masculin = req.body.Masculin;
    //const DateNaissance = new Date(req.query.DateNaissance);
    console.log(IdPersonne)
    console.log(TypePersonne)
    console.log(Prenom2)

    try{
        
        await request.putPersonne(IdPersonne,TypePersonne,NomFamille,Prenom1,Prenom2,Masculin);
        
    
     } catch(error){
        res.status(500).json(error.message);
    }
})



app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
