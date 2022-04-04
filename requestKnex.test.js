const reqKnex = require('./requestKnex.js');

test('RequêteKnex FPS', async () => {
	// Arrange les resultat qui sortirons avant d'etre trier
	const resultat = [{
		IdFPS: 4,
		IdPersonne: 7,
		NoFPS: '438761F',
		DateMesure: new Date('2020-01-01'),
		CD: 'W01',
		Antecedents: 'Voie de fait',
		Violent: null,
		Echappe: null,
		Suicidaire: null,
		Desequilibre: null,
		Desorganise: null,
		Contagieux: null,
		Race: null,
		Taille: null,
		Poids: null,
		Yeux: null,
		Cheveux: null,
		Marques: null,
		Toxicomanie: null,
		Depressif: null
	}];
	const fps = await reqKnex.getFPS(resultat[0].IdPersonne);
	// Assert
	expect(fps).toEqual(resultat);
    
});

test('RequêteKnex, verification connection prof coconcluante', async () => {
	// Arrange les infos fournis par le client
	let loginInfo = {
		'username': 'e1231880',
		'password': 'bonjour'
	};
	//reultat retourner temporaire jusqu'aux temps d'instoration du token
	let resultat = [{
		IdUtilisateur: 6,
		Identifiant: 'e1231880',
		MotDePasse: 'bonjour',
		Etudiant: false,
		NomFamille: 'Vaillancourt'
	}];

	const conn = await reqKnex.connexion(loginInfo.username, loginInfo.password);

	// Assert
	expect(conn).toEqual(resultat);
    
});

test('RequêteKnex, verification connection coconcluante', async () => {
	// Arrange les infos fournis par le client
	let loginInfo = {
		'username': 'e1233772',
		'password': 'bonjour'
	};
	//reultat retourner temporaire jusqu'aux temps d'instoration du token
	let resultat = [{
		IdUtilisateur: 1,
		Identifiant: 'e1233772',
		MotDePasse: 'bonjour',
		Etudiant: true,
		NomFamille: 'Aganier'
	}];

	const conn = await reqKnex.connexion(loginInfo.username, loginInfo.password);

	// Assert
	expect(conn).toEqual(resultat);
    
});

test('RequêteKnex, verification connection sans mot de passe valide', async () => {
	// Arrange les infos fournis par le client
	let loginErrorPwd = {
		'username': 'e1233772',
		'password': null
	};

	let resultatError = [];

	const connErrorPwd = await reqKnex.connexion(loginErrorPwd.username, loginErrorPwd.password);

	// Assert
	expect(connErrorPwd).toEqual(resultatError);
     
});

test('RequêteKnex, verification connection sans User et Password valide', async () => {
	// Arrange les infos fournis par le client
	let loginEmpty = {
		'username': null,
		'password': null
	};

	let resultatError = [];

	const connEmpty = await reqKnex.connexion(loginEmpty.username, loginEmpty.password); 

	// Assert
	expect(connEmpty).toEqual(resultatError);
    
});

test('RequêteKnex, verification connection sans utilisateur valide', async () => {
	// Arrange les infos fournis par le client
	let loginErrorUser = {
		'username': null,
		'password': 'bonjour'
	};

	let resultatError = [];

	const connErrorUser = await reqKnex.connexion(loginErrorUser.username, loginErrorUser.password);

	// Assert
	expect(connErrorUser).toEqual(resultatError);
    
});
//
test('Réponse ***RECHERCHÉ*** avec la fonction affichage', async () => {
	//resultat filtrer pour etre envoyer
	const resultat = [{
		titre: 'Recherché',
		mandat: 'Arrestation',
		cour: 'Municipale de Longueuil',
		numMandat: 'CM-LGL-A-26840',
		natureCrime: 'Agression armée ou infliction de lésions corporelles',
		noEvenement: '108-220208-0031'
	}];
	//requete non filtrer pour test de la fonction
	const requeteInfo = [{
		IdPersonne: 3,
		NomFamille: 'Ducharme',
		Prenom1: 'Benoit',
		Prenom2: null,
		Masculin: true,
		DateNaissance: '1975-08-31',
		Telephone: null,
		NoPermis: null,
		Adresse1: null,
		Adresse2: null,
		Ville: null,
		Province: null,
		CodePostal: null,
		Race: null,
		Taille: null,
		Poids: null,
		Yeux: null,
		Cheveux: null,
		Marques: null,
		Toxicomanie: null,
		Desorganise: null,
		Depressif: null,
		Suicidaire: null,
		Violent: null,
		Gilet: null,
		Pantalon: null,
		AutreVetement: null,
		NoEvenement: '108-220208-0031',
		TypeEvenement: 'Recherché',
		Raison: 'Arrestation',
		DossierEnquete: null,
		Cour: 'Municipale de Longueuil',
		NoCour: 'CM-LGL-A-26840',
		NatureCrime: 'Agression armée ou infliction de lésions corporelles',
		LieuDetention: null,
		FinSentence: null,
		VuDerniereFois: null,
		Agent: null,
		Poste: null,
		IdIPPE: 8,
		Libelle: null
	}];

	const recherche = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);
	//Assert
	expect(recherche).toEqual(resultat);

});

test('Réponse ***Sous observation*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction 
	let requeteInfo = [
		{
			IdPersonne: 4,
			NomFamille: 'Sirois',
			Prenom1: 'Danielle',
			Prenom2: null,
			Masculin: false,
			DateNaissance: '1980-02-14',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			
			NoEvenement: '302-220131-0056',
			TypeEvenement: 'Sous observation',
			Raison: 'Fréquentation criminelle',
			DossierEnquete: 'LVL-RENS-468259',
			Cour: null,
			NoCour: null,
			NatureCrime: 'Vol d’identité',
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: 11,
			Libelle: null
		}
	];
	//resultat filtrer pour etre envoyer 
	const resultat = [
		{
			titre: 'Sous Observation',
			motif: 'Fréquentation criminelle',
			cour: null,
			natureCrime: 'Vol d’identité',
			noEvenement: '302-220131-0056',
			dossierEnq: 'LVL-RENS-468259'
		}
	];

	const sousObs = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(sousObs).toEqual(resultat);

});

test('Réponse ***Accusé*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Accusé',
			cour: 'Municipale de Montréal',
			numCause: 'CM- MTL-57931-852',
			natureCrime: 'Voie de fait grave',
			noEvenement: '123-220115-0014',
			frequentation: null,
			adresse: '705 rue Notre-Dame\n Repentigny Qc J6A 2X1',
			condition: [
				'Avoir comme adresse le\n ',
				'Ne pas entrer en contact avec  Julie Lapierre',
				'Doit garder la paix et avoir bonne conduite'
			]
		}
	];
	//requete non filtrer pour test de la fonction
	let requeteInfo =[
		{
			IdPersonne: 5,
			NomFamille: 'Bélanger',
			Prenom1: 'Claude',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1976-07-12',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '123-220115-0014',
			TypeEvenement: 'Accusé',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-57931-852',
			NatureCrime: 'Voie de fait grave',
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: 12,
			Libelle: [
				'Avoir comme adresse le\n ',
				'Ne pas entrer en contact avec ',
				'Doit garder la paix et avoir bonne conduite'
			]
		}
	];

	const accuse = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(accuse).toEqual(resultat);

});

test('Réponse ***Probation*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat =[
		{
			titre: 'Probation',
			cour: 'Municipale de Montréal',
			numCause: 'CM-MTL-58246-829',
			natureCrime: 'Intimidation générale',
			noEvenement: '123-200303-0026',
			finSentence: new Date('2022-03-01'),
			adresse: '3800 rue Sherbrooke Est Montréal Qc H1X 2A2',
			condition: [
				'Avoir comme adresse le',
				'Ne pas entrer en contact avec  Alain Coutu',
				'Aucune consommation d\'alcool ou de drogue non prescrite\n',
				'Doit garder la paix et avoir bonne conduite'
			],
			frequentation: null,
			agent: 'David Chapdelaine\n',
			telephone: '5142547131',
			poste: '222\n'
		}
	];

	//requete non filtrer pour test de la fonction
	let requeteInfo =[
		{
			IdPersonne: 6,
			NomFamille: 'Levasseur',
			Prenom1: 'Marc',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1971-11-07',
			Telephone: '5142547131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '123-200303-0026',
			TypeEvenement: 'Probation',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-58246-829',
			NatureCrime: 'Intimidation',
			LieuDetention: null,
			FinSentence: '2022-03-01T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'David Chapdelaine',
			Poste: '222',
			IdIPPE: 18,
			Libelle: [
				'Avoir comme adresse le',
				'Ne pas entrer en contact avec ',
				'Aucune consommation d\'alcool ou de drogue non prescrite\n',
				'Doit garder la paix et avoir bonne conduite'
			]
		},
		{
			IdPersonne: 6,
			NomFamille: 'Levasseur',
			Prenom1: 'Marc',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1971-11-07',
			Telephone: '5142547131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '123-200303-0026',
			TypeEvenement: 'Probation',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM- MTL-58246-829',
			NatureCrime: 'Intimidation',
			LieuDetention: null,
			FinSentence: '2022-03-01T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'David Chapdelaine',
			Poste: '222',
			IdIPPE: 18,
			Libelle: [
				'Avoir comme adresse le',
				'Ne pas entrer en contact avec ',
				'Aucune consommation d\'alcool ou de drogue non prescrite\n',
				'Doit garder la paix et avoir bonne conduite'
			]
		}
	];

	const probation = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(probation).toEqual(resultat);

});

test('Réponse ***Libération Conditionnelle*** avec la fonction affichage', async () => {
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Libération Conditionnelle',
			cour: 'Cour du Québec - Chambre criminelle et pénale',
			numCause: '500-01-310-35719-654',
			natureCrime: 'Tentative de meurtre',
			noEvenement: '108-110525-0003',
			fps: '438761F',
			lieuDetention: 'Prison de Port-Cartier',
			finSentence: new Date('2022-09-19'),
			adresse: '150 Pl. Charles-Le Moyne Longueuil Qc J4K 0A8',
			frequentation: null,
			condition: [
				'Avoir comme adresse le ',
				'Ne pas fréquenter  des gens ayant des dossiers criminels\n',
				'Aucune consommation d\'alcool ou de drogue non prescrite\n',
				'Doit garder la paix et avoir bonne conduite'
			],
			agent: 'Benoit Ducharme',
			telephone: '5142547131',
			poste: null
		},
		{
			titre:'FPS',
			NoFPS: '438761F',
			DateMesure: new Date('2020-01-01'),
			CD: 'W01',
			Antecedents: 'Voie de fait',
			Violent: null,
			Echappe: null,
			Suicidaire: null,
			Desequilibre: null,
			Desorganise: null,
			Contagieux: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Depressif: null
		}
	];
	//requete non filtrer pour test de la fonction
	let requeteInfo = [
		{
			IdPersonne: 7,
			NomFamille: 'Hébert',
			Prenom1: 'Francis',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1992-10-19',
			Telephone: '5142745131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '108-110525-0003',
			TypeEvenement: 'Libération Conditionnelle',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Cours du Québec',
			NoCour: '500-01-310-35719-654',
			NatureCrime: 'Tentative de meurtre',
			LieuDetention: 'Prison de Port-Cartier',
			FinSentence: '2022-09-19T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'Benoit Ducharme',
			Poste: null,
			IdIPPE: 19,
			Libelle: [
				'Ne pas fréquenter ',
				'Aucune consommation d alcool ou de drogue non prescrite',
				'Avoir comme adresse le ',
				'Doit garder la paix et avoir bonne conduite'
			]
		},
		{
			IdPersonne: 7,
			NomFamille: 'Hébert',
			Prenom1: 'Francis',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '1992-10-19T00:00:00.000Z',
			Telephone: '5142745131',
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '108-110525-0003',
			TypeEvenement: 'Libération Conditionnelle',
			Raison: null,
			DossierEnquete: null,
			Cour: 'Cours du Québec',
			NoCour: '500-01-310-35719-654',
			NatureCrime: 'Tentative de meurtre',
			LieuDetention: 'Prison de Port-Cartier',
			FinSentence: '2022-09-19T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: 'Benoit Ducharme',
			Poste: null,
			IdIPPE: 19,
			Libelle: [
				'Ne pas fréquenter des gens ayant des dossiers criminels',
				'Aucune consommation d alcool ou de drogue non prescrite',
				'Avoir comme adresse le ',
				'Doit garder la paix et avoir bonne conduite'
			]
		}
	];

	const LibCond = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(LibCond).toEqual(resultat);

});

test('Réponse ***Disparu*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction
	let requeteInfo =
	[
		{
			IdPersonne: 8,
			NomFamille: 'Amoussougbo',
			Prenom1: 'Yaken',
			Prenom2: null,
			Masculin: true,
			DateNaissance: '2000-03-04',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: 'Noir',
			Taille: 175,
			Poids: 75,
			Yeux: 'Noir',
			Cheveux: 'Noir',
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: true,
			Suicidaire: null,
			Violent: null,
			Gilet: 'T-shit vert',
			Pantalon: 'Jeans bleu',
			AutreVetement: 'Espadrille fluo',
			NoEvenement: '302-220208-0016',
			TypeEvenement: 'Disparu',
			Raison: 'Disparition',
			DossierEnquete: null,
			Cour: null,
			NoCour: null,
			NatureCrime: null,
			LieuDetention: null,
			FinSentence: null,
			VuDerniereFois: '3546 boul. De la Concorde Est, Laval',
			Agent: null,
			Poste: null,
			IdIPPE: 20,
			Libelle: null
		}
	];

	////resultat filtrer pour etre envoyer au client    
	const resultat = [
		{
			titre: 'Disparu',
			noEvenement: '302-220208-0016',
			nature: 'Disparition',
			derniereVu: '3546 boul. De la Concorde Est, Laval',
			descrPhysique: {
				race: 'Noir',
				taille: 175,
				poids: 75,
				yeux: 'Noir',
				cheveux: 'Noir',
				marques: null
			},
			descrVestimentaire: {
				gilet: 'T-shirt vert',
				pantalon: 'Jeans bleu',
				autreVetements: 'Espadrille fluo'
			},
			problemesSante: {
				toxicomanie: null,
				desorganise: null,
				depressif: true,
				suicidaire: null,
				violent: null
			}
		}
	];
	const disp = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(disp).toEqual(resultat);

});

test('Réponse ***Interdit*** avec la fonction affichage', async () => {
	//requete non filtrer pour test de la fonction
	const requeteInfo = [
		{
			IdPersonne: 9,
			NomFamille: 'Lemire',
			Prenom1: 'Jessy',
			Prenom2: null,
			Masculin: false,
			DateNaissance: '1985-10-28',
			Telephone: null,
			NoPermis: null,
			Adresse1: null,
			Adresse2: null,
			Ville: null,
			Province: null,
			CodePostal: null,
			Race: null,
			Taille: null,
			Poids: null,
			Yeux: null,
			Cheveux: null,
			Marques: null,
			Toxicomanie: null,
			Desorganise: null,
			Depressif: null,
			Suicidaire: null,
			Violent: null,
			Gilet: null,
			Pantalon: null,
			AutreVetement: null,
			NoEvenement: '123-201225-0016',
			TypeEvenement: 'Interdit',
			Raison: 'Conduite de véhicule',
			DossierEnquete: null,
			Cour: 'Municipale de Montréal',
			NoCour: 'CM-MTL-16794-356',
			NatureCrime: 'Capacité de conduire affaiblie',
			LieuDetention: null,
			FinSentence: '2022-10-29T00:00:00.000Z',
			VuDerniereFois: null,
			Agent: null,
			Poste: null,
			IdIPPE: 22,
			Libelle: null
		}
	];
	////resultat filtrer pour etre envoyer au client
	const resultat = [
		{
			titre: 'Interdit',
			nature: 'Conduite de véhicule',
			cour: 'Municipale de Montréal',
			numCour: 'CM-MTL-16794-356',
			natureCrime: 'Capacité de conduire affaiblie',
			noEvenement: '123-201225-0016',
			expiration: new Date('2022-10-29')
		}
	];
	const interdit = await reqKnex.getIPPE(requeteInfo[0].NomFamille, requeteInfo[0].DateNaissance, requeteInfo[0].Prenom1, requeteInfo[0].Prenom2, requeteInfo[0].Masculin);

	expect(interdit).toEqual(resultat);

});
