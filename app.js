const express = require('express');
const app = express();
const cors = require('cors');
const request = require('./requestKnex.js');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/login', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');

	const { identifiant, motDePasse } = req.body;

	if (identifiant === undefined || motDePasse === undefined) 
		return res.status(400).json('paramètre manquant');

	try {
		const resultat = await request.connexion(identifiant, motDePasse);

		if(resultat.length!=0){
			//envoi du message contenant les information pour le login
			/**** TEMPORAIRE JUSQU'A TEMPS QUE L'ON VOIT LES NOTION DE TOKEN*****/
			return res.status(200).json({
				'succes' : true,
				'Etudiant': resultat[0].Etudiant,
				'Matricule': resultat[0].Identifiant,
				'Nom': resultat[0].NomFamille });
	
		} else
			return res.status(404).json('le user ou le password est invalide');
		
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.get('/ippeInfo', async (req, res) => {
	let resultat;
	const nomFamille = req.query.nomFamille;
	const prenom1 = req.query.prenom1;
	const prenom2 = (req.query.prenom2 === '') ? null : req.query.prenom2;
	const masculin = (req.query.masculin === 'true') ? true : false;
	const dateNaissance = new Date(req.query.dateNaissance);
	if (nomFamille === undefined || prenom1 === undefined || prenom2 === undefined
        || masculin === undefined || dateNaissance === undefined) 
		return res.status(400).json('paramètre manquant');
	try {
		resultat = await request.getIPPE(nomFamille, dateNaissance, prenom1, prenom2, masculin);
		if(resultat.length===0)
		{   
			//retourne la valeur negative si la personne na pas de fichier IPPE
			return res.status(404).json('Cette personne n\'est pas répertoriée');
		}
		//retourne que les valeurs au client; necessaire a la recherche IPPE
		return res.status(200).json(resultat);
	} catch (error) {
		res.status(500).json(error.message);
	}
});


app.get('/modifier/:type', async (req,res)=> {
	try{
		const typedb = req.params.type.toUpperCase();
		let data;
		if (!typedb.includes('IBOB','IBVA','IBAF')) 
			return res.status(400).json({'message':'non autorisé'});
		if (req.query.id!==undefined)  data = await request.getDataById(typedb, req.query.id);
		else data = await request.getData(typedb);
		if(data.length===0)
		{   
			//retourne la valeur negative
			return res.status(404).json({'message':'aucune donnée trouvé'});
		}
		//retourne que les valeurs au client;
		return res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error.message);
	}
});


app.post('/ajouter', async (req)=> {
	try{
		let data = {
			'NoSerie':req.query.serie,
			'NoEvenement':req.query.evenement,
			'Description':req.query.desc
		};
		await request.addData('IBOB',data);
	}catch (err) {
		console.log(err);
	}
	
});

app.put('/modifier', async(req) => {
	try {
		let data = {
			'NoSerie':req.query.serie,
			'NoEvenement':req.query.evenement,
			'Description':req.query.desc
		};
		await request.updateData('IBOB',data);
	} catch (error) {
		console.log(error);
		
	}
});

app.delete('/delete/:type', async(req,res) => {
	let data;
	const typedb = req.params.type;
	if (!typedb.includes('IBOB','IBVA','IBAF')||req.query.id===null) 
		return res.status(400).json('non autorisé');
	try{
		data = await request.getDataById(typedb, req.query.id);
		if(data.length===0)
		{   
			//retourne la valeur negative
			return res.status(404).json({'message':'aucune donnée trouvé'});
		}
		else {
			await request.deleteData(typedb,req.query.id);
			//retourne que les valeurs au client;
			return res.status(200).json({ 'message': 'l\'objet a bien été supprimé'});
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.get('/ListIBAF', async(req,res) => {
	try {
		const resultat = await request.getListData('IBAF');

		res.send(resultat);
	}
	catch (error) {
		console.log(error);
	}
});

app.get('/ListIBOB', async(req,res) => {
	try {
		const resultat = await request.getListData('IBOB');

		res.send(resultat);
	}
	catch (error) {
		console.log(error);
	}
});

app.get('/ListIBVA', async(req,res) => {
	try {
		const resultat = await request.getListData('IBVA');

		res.send(resultat);
	}
	catch (error) {
		console.log(error);
	}
});


app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});