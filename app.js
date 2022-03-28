/* eslint-disable no-case-declarations */
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


//route pour avoir les donnees afficher dans les listes selon la banque selectionnées
app.get('/modifier/:type', async (req,res)=> {
	try{
		const typedb = req.params.type.toUpperCase();

		const type = ['IBOB','IBVA','IBAF'];
		let data;
		let BOOLS = type.some(i => typedb.includes(i));
		//si la banque ne correspond a aucune des trois ca retourne une errer
		if (!BOOLS) 
			return res.status(400).json({'message':'non autorisé'});
		if (req.query.id!==undefined) data = await request.getDataById(typedb, req.query.id);
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


app.post('/ajouter/:type', async (req, res)=> {
	//http://localhost:3000/ajouter/${typebd}
	const typedb = req.params.type.toUpperCase();
	//NoSerie=410MXBPVF637&marque=LG&modele=32LB5600-UZ&typeOb=RA&resIBOB=02&NoEvent=123&annee=2022&mois=03&jour=01&NoSeq=0007
	const annee = req.body.annee.substring(2,4);

	const Noevenement = `${req.body.NoEvent}-${annee}${req.body.mois}${req.body.jour}-${req.body.NoSeq}`;
	//verifie si l'entite a ajouter existe deja dans la base de donnees 
	let DataAdd = await request.getDataByNoEvent(typedb, Noevenement);
	//si oui renvoyer une errer
	if(DataAdd.length !== 0) return res.status(404).json({'message':'l\'entité se trouve déja dans la base de donnée'});

	//choix des infos a envoyer selon la banque de données choisi
	switch(typedb){
	case 'IBOB':
		try{
			if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.modele === undefined
					|| req.body.typeOb === undefined || Noevenement === undefined || req.body.resIBOB === undefined ) 
				return res.status(400).json('paramètre manquant');
			let DataToSend = {
				'NoSerie': req.body.NoSerie,
				'Marque': req.body.marque,
				'Modele': req.body.modele,
				'TypeObjet': req.body.typeOb,
				'NoEvenement': Noevenement,
			};
			//ajout de données
			await request.addData(typedb, DataToSend);
			//avoir le id de la nouvelle entité
			let Data = await request.getDataByNoEvent(typedb, Noevenement);
			if(Data.length===0) return res.status(404).json({'message':'aucune donnée trouvé'});
			else return res.status(200).json({'message':`L’entité a été ajoutée avec succès Id: ${Data[0].IdIBOB}`});
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;			
				
	case 'IBVA':
		//NoSerie=628181-4249-96708&auteur=MASTERCARD&typeVa=Carte+de+crédit+%2F+débit&resIBVA=Perdu&NoEvent=123&annee=2022&mois=03&jour=01&NoSeq=0007
		try{
			//renvoyer une errer si un des parametres est undefined
			if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
					|| req.body.resIBVA === undefined || Noevenement === undefined) 
				return res.status(400).json('paramètre manquant');
			let DataToSend = {
				'Identifiant': req.body.NoSerie,
				'Auteur': req.body.auteur,
				'TypeValeur': req.body.typeVa,
				'TypeEvenement': req.body.resIBVA,
				'NoEvenement': Noevenement,
			};
			await request.addData(typedb, DataToSend);
			let Data = await request.getDataByNoEvent(typedb, Noevenement);
			if(Data.length===0) return res.status(404).json({'message':'aucune donnée trouvé'});
			else return res.status(200).json({'message':`L’entité a été ajoutée avec succès Id: ${Data[0].IdIBVA}`});
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;
		
	case 'IBAF':
		//NoSerie=3572586&marque=WINCHESTER&calibre=223+++++++&typeAr=Carabine&resIBAF=02&NoEvent=123&annee=2022&mois=03&jour=08&NoSeq=0023
		try{
			const calibre = (!req.body.calibre.includes('+') && req.body.calibre !== undefined) ? req.body.calibre.split('+')[0] : req.body.calibre;
			if (req.body.NoSerie === undefined || req.body.marque === undefined || calibre === undefined
						|| req.body.typeAr === undefined || req.body.resIBAF === undefined || Noevenement === undefined) 
				return res.status(400).json('paramètre manquant');
			let DataToSend = {
				'NoSerie': req.body.NoSerie,
				'Marque': req.body.marque,
				'Calibre': calibre,
				'TypeArme': req.body.typeAr,
				'NoEvenement': Noevenement,
			};
			await request.addData(typedb, DataToSend);
			let Data = await request.getDataByNoEvent(typedb, Noevenement);
			if(Data.length === 0) return res.status(404).json({'message':'aucune donnée trouvé'});
			else return res.status(200).json({'message':`L’entité a été ajoutée avec succès Id: ${Data[0].IdIBAF}`});
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;
	}
});

//route pour modifier les donnees dans la base
app.put('/modifier/:type/:id', async(req, res) => {
	const typedb = req.params.type.toUpperCase();

	//NoSerie=410MXBPVF637&marque=LG&modele=32LB5600-UZ&typeOb=RA&resIBOB=02&NoEvent=123&annee=2022&mois=03&jour=01&NoSeq=0007
	const annee = req.body.annee.substring(2,4);

	const Noevenement = `${req.body.NoEvent}-${annee}${req.body.mois}${req.body.jour}-${req.body.NoSeq}`;

	//verifier si l'entite est deja dans la base de donnees
	let DataAdd = await request.getDataById(typedb, parseInt(req.params.id));
	//si non renvoye une errer
	if(DataAdd.length === 0) return res.status(404).json({'message':'l\'entité n\'existe pas dans la base de donnée'});

	//choix des donnees a ebvoyer selon la banque choisi
	switch(typedb){
	case 'IBOB':
		try{
			if (req.body.NoSerie === undefined || req.body.marque === undefined || req.body.modele === undefined
					|| req.body.typeOb === undefined || Noevenement === undefined || req.body.resIBOB === undefined ) 
				return res.status(400).json({'message':'paramètre manquant'});
			let DataToSend = {
				'NoSerie': req.body.NoSerie,
				'Marque': req.body.marque,
				'Modele': req.body.modele,
				'TypeObjet': req.body.typeOb,
				'NoEvenement': Noevenement,
			};
			//donner en parametre le type de la table/ les donnees a update/ et le id de l'entite a update
			await request.updateData(typedb, DataToSend, parseInt(req.params.id));
			return res.status(200).json({'message':'L’entité a été modifié avec succès'});
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;			
				
	case 'IBVA':
		//NoSerie=628181-4249-96708&auteur=MASTERCARD&typeVa=Carte+de+crédit+%2F+débit&resIBVA=Perdu&NoEvent=123&annee=2022&mois=03&jour=01&NoSeq=0007
		try{
			if (req.body.NoSerie === undefined || req.body.auteur === undefined || req.body.typeVa === undefined
					|| req.body.resIBVA === undefined || Noevenement === undefined) 
				return res.status(400).json('paramètre manquant');
			let DataToSend = {
				'Identifiant': req.body.NoSerie,
				'Auteur': req.body.auteur,
				'TypeValeur': req.body.typeVa,
				'TypeEvenement': req.body.resIBVA,
				'NoEvenement': Noevenement,
			};
			await request.updateData(typedb, DataToSend, parseInt(req.params.id));
			return res.status(200).json({'message':'L’entité a été modifié avec succès'});
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;
		
	case 'IBAF':
		//NoSerie=3572586&marque=WINCHESTER&calibre=223+++++++&typeAr=Carabine&resIBAF=02&NoEvent=123&annee=2022&mois=03&jour=08&NoSeq=0023
		try{
			const calibre = (!req.body.calibre.includes('+') && req.body.calibre !== undefined) ? req.body.calibre.split('+')[0] : req.body.calibre;
			if (req.body.NoSerie === undefined || req.body.marque === undefined || calibre === undefined
						|| req.body.typeAr === undefined || req.body.resIBAF === undefined || Noevenement === undefined) 
				return res.status(400).json('paramètre manquant');
			let DataToSend = {
				'NoSerie': req.body.NoSerie,
				'Marque': req.body.marque,
				'Calibre': calibre,
				'TypeArme': req.body.typeAr,
				'NoEvenement': Noevenement,
			};
			await request.updateData(typedb, DataToSend, parseInt(req.params.id));
			return res.status(200).json({'message':'L’entité a été modifié avec succès'});
				
		}catch (error) {
			res.status(500).json(error.message);
		}
		break;
	}
});

//route pour delete l'entité
app.delete('/delete/:type', async(req,res) => {
	let data;
	const typedb = req.params.type.toUpperCase();
	const type = ['IBOB','IBVA','IBAF'];
	let BOOLS = type.some(i => typedb.includes(i));

	if (!BOOLS||req.query.id===null) 
		return res.status(400).json('non autorisé');
	try{
		data = await request.getDataById(typedb, req.query.id);
		if(data.length===0)
		{   
			//retourne message d'errer
			return res.status(404).json({'message':'aucune donnée trouvé'});
		}
		else {
			await request.deleteData(typedb,req.query.id);
			//retourne une confirmation
			return res.status(200).json({ 'message': 'l\'objet a bien été supprimé'});
		}
	} catch (error) {
		res.status(500).json(error.message);
	}
});

app.listen(PORT, () => {
	console.log(`Mon application roule sur http://localhost:${PORT}`);
});