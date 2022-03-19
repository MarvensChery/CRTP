const knex = require('knex')({
	client: 'mssql',
	connection: {
		host: 'sv55.cmaisonneuve.qc.ca',
		user: '4D1Equipe05',
		password: 'njt862',
		database: '4D1Equipe05',
		options: {
			enableArithAbort: false
		},
	},
	pool: {min: 0, max: 7}
});

//Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse){
	return knex('Utilisateurs')
		.where('Identifiant', identifiant)
		.andWhere('MotDePasse', motDePasse);
}

async function getIPPE(nom,ddn, prenomUn, prenomDeux, sexe){
	const resultat = new Array();
	const reponseIPPe = await knex('Personnes')
		.where('NomFamille', nom)
		.andWhere('DateNaissance', ddn)
		.andWhere('Prenom1', prenomUn)
		.andWhere('Prenom2', prenomDeux)
		.andWhere('Masculin', sexe)
		.leftJoin('PersonnesIPPE', 'PersonnesIPPE.IdPersonne', 'Personnes.idPersonne')
		.leftJoin('IPPE', 'IPPE.idIPPE', 'PersonnesIPPE.IdIPPE')
		.leftJoin('Conditions', 'Conditions.IdIPPE', 'IPPE.IdIPPE')
		.leftJoin('Crimes', 'IPPE.IdNatureCrime', 'Crimes.IdCrime')
		.select('*');

	console.log(reponseIPPe);

	//Recherche si la personne possede un dossier FPS et le push a la reponse
	const reponseFPS = await getFPS(reponseIPPe[0].IdPersonne);
	let IPPEresult = formatterIPPE(reponseIPPe, reponseFPS);
	IPPEresult.forEach(element => {
		resultat.push(element);	
	});
	if(reponseFPS.length !=0 ){
		const FPSresult =  formatterFPS(reponseFPS);

		FPSresult.forEach(element => {
			resultat.push(element);	
		});
	}
	return resultat;
}

function getFPS(DataIdPersonne){
	return knex('FPS')
		.where('FPS.IdPersonne', parseInt(DataIdPersonne))
		.join('Personnes', 'Personnes.IdPersonne', 'FPS.IdPersonne')
		.select('FPS.*', 
			'Personnes.Race',
			'Personnes.Taille',
			'Personnes.Poids',
			'Personnes.Yeux',
			'Personnes.Cheveux',
			'Personnes.Marques',
			'Personnes.Toxicomanie',
			'Personnes.Desorganise',
			'Personnes.Depressif');
}



//Fonction qui manie l'affichage de la reponse IPPE
function formatterIPPE(dataIPPE, dataFps){
	let dataToSend =  new Array();
	let libelleList =  new Array();

	dataIPPE.forEach((data)=>{
		//Verifie si l'information IPPE se trouve deja dans les datas a envoyer
		//const dupCheck = dataToSend.some(element => {element.IdIPPE === data.IdIPPE;} );

		if(data.Libelle!==null){
			if (data.Libelle.includes('entrer en contact')) libelleList.push(`${data.Libelle} ${data.Victime}`);
			else if (data.Libelle.includes('fréquenter')) libelleList.push(`${data.Libelle} ${data.Frequentation}`);
			else libelleList.push(data.Libelle);
		}else {
			//si aucunes conditions n'est presente rien est envoyer dans le tableau de conditions
			libelleList = null;
		}
		//le switch trie les elements a envoyer pour ne pas envoyer d'information inutile
		switch(data.TypeEvenement){
		case 'Recherché':
			dataToSend.push(
				{
					titre:'Recherché',
					mandat: data.Mandat,
					cour: data.Cour,
					numMandat: data.NoMandat,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement
				});
			break;
		case 'Sous observation':
			dataToSend.push(
				{
					titre:'Sous Observation',
					motif: data.Motif,
					cour: data.Cour,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement,
					dossierEnq: data.DossierEnquete

				});
			break;
		case 'Accusé':
			dataToSend.push(
				{
					titre:'Accusé',
					cour: data.Cour,
					numCause: data.NoCause,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement,
					frequentation: data.Frequentation,
					adresse: `${data.Adresse1} ${data.Ville} ${data.Province} ${data.CodePostal}`,
					condition: libelleList
				});
			break;
		case 'Probation':
			dataToSend.push(
				{
					titre:'Probation',
					cour: data.Cour,
					numCause: data.NoCause,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement,
					finSentence: data.FinSentence,
					adresse: `${data.Adresse1} ${data.Ville} ${data.Province} ${data.CodePostal}`,
					condition: libelleList,
					frequentation: data.Frequentation,
					agent: data.AgentProbation,
					telephone: data.Telephone,
					poste: data.Poste
				});
			break;
		case 'Libération Conditionnelle':
			dataToSend.push(
				{
					titre:'Libération Conditionnelle',
					cour: data.Cour,
					numCause: data.NoCause,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement,
					fps: dataFps[0].NoFPS,
					lieuDetention: data.LieuDetention,
					finSentence: data.FinSentence,
					adresse: `${data.Adresse1} ${data.Ville} ${data.Province} ${data.CodePostal}`,
					condition: libelleList,
					frequentation: data.Frequentation,
					agent: data.AgentLiberation,
					telephone: data.Telephone,
					poste: data.Poste
				});
			break;
		case 'Disparu':
			dataToSend.push(
				{
					titre:'Disparu',
					noEvenement: data.NoEvenement,
					nature: data.Nature,
					derniereVu: data.VuDerniereFois,
					descrPhysique:{ 
						race: data.Race, 
						taille: data.Taille, 
						poids: data.Poids,
						yeux: data.Yeux,
						cheveux: data.Cheveux,
						marques: data.Marques},
					descrVestimentaire:{
						gilet: data.Gilet,
						pantalon: data.Pantalon,
						autreVetements: data.AutreVetement},
					problemesSante:{
						toxicomanie: data.Toxicomanie,
						desorganise: data.Desorganise,
						depressif: data.Depressif,
						suicidaire: data.Suicidaire,
						violent: data.Violent}
				});
			break;
		case 'Interdit':
			dataToSend.push(
				{
					titre:'Interdit',
					nature: data.Nature,
					cour: data.Cour,
					numCour: data.NoCause,
					natureCrime: data.NatureCrime,
					noEvenement: data.NoEvenement,
					expiration: data.FinSentence
				});
			break;
		}
		
	});
	//gere les doublons en les supprimants
	let result = dataToSend.reduce((unique, o) => {
		if(!unique.some(obj => obj.noEvenement === o.noEvenement && obj.value === o.value)) 
			unique.push(o);
		
		return unique;
	},[]);

	return result;
}

//Fonction qui prend en charge l'affichage des FPS
function formatterFPS(dataFPS){
	let dataToSend =  new Array();
	dataToSend.push({
		titre: 'FPS',
		NoFPS: dataFPS[0].NoFPS,
		DateMesure: dataFPS[0].DateMesure,
		CD: dataFPS[0].CD,
		Antecedents: dataFPS[0].Antecedents,
		Violent: dataFPS[0].Violent,
		Echappe: dataFPS[0].Echappe,
		Suicidaire: dataFPS[0].Suicidaire,
		Desequilibre:dataFPS[0].Desequilibre,
		Contagieux: dataFPS[0].Contagieux,
		Race: dataFPS[0].Race,
		Taille: dataFPS[0].Taille,
		Poids: dataFPS[0].Poids,
		Yeux: dataFPS[0].Yeux,
		Cheveux: dataFPS[0].Cheveux,
		Marques: dataFPS[0].Marques,
		Toxicomanie: dataFPS[0].Toxicomanie,
		Desorganise: dataFPS[0].Desorganise,
		Depressif: dataFPS[0].Depressif}); 

	return dataToSend;
}


async function addData(bd,data) {
	return await knex(bd)
		.insert(data);
}

async function updateData(bd,data) {
	return await knex(bd)
		.update(data)
		.where('NoSerie','=',data.NoSerie);
}

async function deleteData(bd,data) {
	return await knex(bd)
		.where('NoSerie','=',data.NoSerie)
		.del();
}


module.exports = {
	connexion,
	getIPPE,
	getFPS,
	addData,
	updateData,
	deleteData

};