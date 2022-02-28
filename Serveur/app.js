const express = require('express');
const cors = require('cors');
const requeteKnex = require('./database/requeteKnex');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get('/personnes', async (req, rep) => {
  try {
    const personne = await requeteKnex.getPersonne();
    rep.status(200).json(personne);
  } catch (error) {
    rep.status(500).json();
  }
});

app.get('/utilisateurs', async (req, rep) => {
  try {
    const utilisateurs = await requeteKnex.getUtilisateurs();
    rep.status(200).json(utilisateurs);
  } catch (error) {
    rep.status(500).json();
  }
});

app.get('/ippe/:nomFamille/:prenom1/:prenom2/:masculin/:anne/:mois/:jour', async (req, rep) => {
  try {
    const { nomFamille } = req.params;
    const { prenom1 } = req.params;
    const { prenom2 } = req.params;
    const { masculin } = req.params;

    const { anne } = req.params;
    const { mois } = req.params;
    const { jour } = req.params;

    // 'Ducharme','Benoit', null, true, new Date('1975-08-31')
    // 'Michaud', 'Noémie', null, false, new Date('2002-08-07')
    // 'Sirois','Danielle', null, false, new Date('1980-02-14')
    // 'Bélanger','Claude', null, true, new Date('1976-07-12')
    // 'Levasseur', 'Marc', null, true, new Date('1971-11-07')
    // 'Lemire', 'Jessy', null, false, new Date('1985-10-28')
    // 'Amoussougbo', 'Yaken', null, true, new Date('2000-03-14')
    // 'Hébert', 'Francis', null, true, new Date('1992-10-19')
    // ?nomFamille=Ducharme?prenom1=Benoit?prenom2=null?masculin=true?datenaissance=new Date('1975-08-31')
    // nomFamille, prenom1, prenom2, masculin, datenaissance
    /// :nomFamille/:prenom1/:prenom2/:masculin/:datenaissance
    const ippe = await requeteKnex.getIPPE(nomFamille, prenom1, prenom2, masculin, new Date(`${anne}-${mois}-${jour}`));
    rep.status(200).json(ippe);
  } catch (error) {
    rep.status(500).json();
  }
});

app.get('/conditions', async (req, rep) => {
  try {
    const conditions = await requeteKnex.getConditions();
    rep.status(200).json(conditions);
  } catch (error) {
    rep.status(500).json();
  }
});

app.get('/fps', async (req, rep) => {
  try {
    const fps = await requeteKnex.getFPS();
    rep.status(200).json(fps);
  } catch (error) {
    rep.status(500).json();
  }
});

app.listen(PORT, () => {
  console.log(`Mon application du côté serveur est en train d'exécuter sur le port ${PORT}`);
});
