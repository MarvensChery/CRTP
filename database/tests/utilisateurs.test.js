/* eslint-disable linebreak-style */
const utilisateurs = require('../utilisateurs');

test('getUtilisateurByIdentifiant', async () => {
    const expectedResult = [{
        IdUtilisateur: 1,
        Identifiant: 'e1234567',
        Courriel: 'e1234567@email.com',
        MotDePasse: '$2b$10$w6yZq4WA8jj4MldkfPcMjec4hFBE7a4A6iZzdOSd92yNMLX/1feSG',
        Etudiant: true,
        NomFamille: 'EtudiantAganier',
    }];
    const result = await utilisateurs.getUtilisateurByIdentifiant(expectedResult[0].Identifiant);
    expect(expectedResult).toEqual(result);
});

test('connexion', async () => {
    const expectedResult = [{
        IdUtilisateur: 1,
        Identifiant: 'e1234567',
        Courriel: 'e1234567@email.com',
        MotDePasse: '$2b$10$w6yZq4WA8jj4MldkfPcMjec4hFBE7a4A6iZzdOSd92yNMLX/1feSG',
        Etudiant: true,
        NomFamille: 'EtudiantAganier',
    }];
    const result = await utilisateurs.connexion(expectedResult[0].Courriel);
    expect(expectedResult).toEqual(result);
});

