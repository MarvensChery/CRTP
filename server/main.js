//module 
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const app = express();
const requetesKnex = require('./requetesKnex')

app.use(express.static(__dirname + "../../public/"));
app.use(express.static(__dirname + "../../CSS/"))

//route login
app.get("/login", (req, rep) => {
    rep.sendFile(path.join(__dirname, "../public/connexion.html"))
})

//route resultat de recherche
app.get("/negatif", (req, rep) => {
    rep.sendFile(path.join(__dirname, "../public/test.html"))
})

//route menu
app.get("/menu", (req, rep) => {
    //WORKING!!
    rep.sendFile(path.join(__dirname, "../public/menu.html"));
});

//route menu rechercheIPPE
app.get("/IPPE", (req, rep) => {
    //WORKING!!
    rep.sendFile(path.join(__dirname, "../public/MenuRechercheIPPE.html"))
});

//route qui permet de retourner les infos d'un user de la table user à l'aide de l'id

/*app.get('/utilisateur/:id', async (req, res) => {
	try {
		let id = parseInt(req.params.id);
		console.log(id)
		let utilisateur = await requetesKnex.getUser(id);
		console.log(utilisateur)
		res.status(200).json(
			utilisateur
		);
	} catch (error) {
		res.json({
			success: false,
			error: error,
		});
	}
});*/

//route qui permet de retourner tous les informations des users
app.get('/utilisateurs', async (req, res) => {
	try {
		let utilisateur = await requetesKnex.getAllUser();
		res.status(200).json(
			utilisateur
		);
	} catch (error) {
		res.json({
			success: false,
			error: error,
		});
	}
});

//route menu rechercheIPPE
app.get("/IPPE/test", async (req, rep) => {
	rep.sendFile(path.join(__dirname, "../public/test.html"))
});

//route qui permet de retourner les conditions selon l'id
app.get("/IPPE/conditions/:id", async (req, rep) => {
	try {
	let condition = await requetesKnex.getCondition(req.params.id)
	rep.status(200).json(
		condition
		);
} catch (error) {
	rep.json({
		success: false,
		error: error,
	});
	console.log(error)
}
});


app.get("/IPPE/IPPE/:id", async (req, rep) => {
	try {
	let IPPE = await requetesKnex.getIPPE(req.params.id)
	rep.status(200).json(
		IPPE
		);
} catch (error) {
	rep.json({
		success: false,
		error: error,
	});
	console.log(error)
}
});


app.get("/IPPE/resultat", async (req, rep) => {
   try {
		let prenom2;
		if (req.query.prenom2 == ''){
			prenom2 = null;
		}else{
			prenom2 = req.query.prenom2;
		}
		const DDN = `${req.query.annee}-${req.query.mois}-${req.query.jour}`
		let personne = await requetesKnex.getPersonne(
            req.query.nom,
            req.query.prenom1, 
            prenom2, 
            req.query.sexe,
            DDN);
		console.log(personne);

		rep.status(200).json(
			personne
			);		
	} catch (error) {
		rep.json({
			success: false,
			error: error,
            
		});
        console.log(error)
	}
});

//permet de rouler le serveur
app.listen(PORT, () => {
	console.log(`Serveur en courd d'exécution: http://localhost:${PORT}/login`);
});
