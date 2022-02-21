const express = require("express");
const requeteKnex = require("./database/requeteKnex");
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({extended: false}));

app.get("/personnes", async(req, rep) => {
    try {
        let personne = await requeteKnex.getPersonne();
        rep.status(200).json(personne);
        
    } catch (error) {
        rep.status(500).json();
    }
})


app.get("/utilisateurs", async(req, rep) => {
    try {
        let utilisateurs = await requeteKnex.getUtilisateurs();
        rep.status(200).json(utilisateurs);
        
    } catch (error) {
        rep.status(500).json();
    }
})

app.get("/ippe", async(req, rep) => {
    try {
        let ippe = await requeteKnex.getIPPE();
        rep.status(200).json(ippe);
        
    } catch (error) {
        rep.status(500).json();
    }
})

app.get("/conditions", async(req, rep) => {
    try {
        let conditions = await requeteKnex.getConditions();
        rep.status(200).json(conditions);
        
    } catch (error) {
        rep.status(500).json();
    }
})

app.get("/fps", async(req, rep) => {
    try {
        let fps = await requeteKnex.getFPS();
        rep.status(200).json(fps);
        
    } catch (error) {
        rep.status(500).json();
    }
})

app.listen(PORT, () => {
    console.log("Mon application du côté serveur est en train d'exécuter sur le port " + PORT)
})