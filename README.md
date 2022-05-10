<<<<<<< HEAD
# Projet_CRPQ_Equipe5
## Projet API
=======
# Projet CRPQ
## API

## Projet API
Projet de consultation de base de données pour les étudiants de Technique policière.

Dans le cadre du cours de Projet 2 - 4D1, le projet consiste à réaliser à développer une application capable de simuler l'outil d'interrogation de base de données à la disposition d'un agent de l'ordre lors de ses interventions.

>>>>>>> dev



## Cadre d'utilisation
Cette application servira comme outil de formation auz étudiants en Technique policière. Il permettra à l'étudiant de:
- Utiliser un outil de recherche de base de données
- Se familiariser avec les informations récoltées lors d'une interpellation

<<<<<<< HEAD
<<<<<<< HEAD
## Collaboration
Ce projet est réalisé par: Alexandre Ben Daia, Lucas Montion, Ramy Naffati et Samy Issiakhem
***Le PO : Marc Levasseur
## Comment éxécuter le BACKEND? 


### 1- Faite un git clone HTTP de backend_vue dans le terminal

### 2- Placer vous dans la branche backend_vue

### 3- Placer vous dans le répertoire backend:

### 4- Taper ceci dans le terminal pour installer les dépendance
```
npm install
```
### 5- Tapez ceci dans le terminal pour lancer le serveur:
```
node app.js
```
## Lint

Afin d'utiliser le linter sur tout les fichiers et corriger les erreurs la commande a taper est : 
```
npm run lint
```


## Comment éxécuter le FRONTEND? 


### 1- Faites un git clone HTTP de frontend_vue dans le terminal

### 2- Placez vous dans la branche frontend_vue

### 3- Placez vous dans le répertoire appweb:

### 4- Tapez ceci dans le terminal pour installer les dépendance
```
npm install
```
### 5- Tapez ceci dans le terminal pour corriger toutes les erreurs de lint:
```
npm run fix
```
### 6- Tapez ceci dans le terminal pour lancer le projet:
```
npm run serve
```
### 7- Cliquez sur le lien localhost qui apparaitra dans le terminal

### 8- Cliquez sur le menu de navigation qui se situe en haut de la page et cliquer sur les banques de données valeurs, armes à feu ou objet pour pouvoir voir les listes de données


=======
## Colaboration
Réalisé par :<br/>
Amzert, Karim - E2069838<br/>
Cambray, Bastien - E1920614<br/>
Khendaf, Bilal - E1730934<br/>
Phung, Truong Sang Mario - E2066576
=======
* Salah Eddine Ouamalich
## Collaborateurs
**Ce projet est développé par:**
* Dan Bagalwa
* David Déchaine
* Charles-Étienne Doucet
* Ryma Merrouchi

* Amzert, Karim - E2069838
* Cambray, Bastien - E1920614
* Khendaf, Bilal - E1730934
* Phung, Truong Sang Mario - E2066576

* Kassem Kandil
* Nathan Lamy
* Salah Eddine Ouamalich
* Tran Nguyen Johnny Huy
>>>>>>> dev

**PO :** Marc Levasseur.

## Utilisation
Installation de toutes les dependances:
    `npm i`

Exécution des tests unitaires:
    `npm test`

Détection des erreurs de lint:
    `npm run lint`

Correction des erreurs de lint:
    `npm run fix`

Lancement du serveur:
    `npm run serve`

Le serveur s'exécute sur le port 3000.



## Appel d'API

Ajout/Modification/suppresion dune personne


    Appel API{
        

        GET /personnes/{idPersonne}

        POST /personnes

        PUT /personnes/{idPersonne}

        DELETE /personnes/{idPersonne}

    }


Ajout/Modification d’une adresse de personne


    Appel API{


        GET /personnes/{idPersonne}

        PUT /personnes/{idPersonne}

        }

Ajout/Modification d’une description de personne


    Appel API{


        GET /personnes/{idPersonne}
>>>>>>> dev

        PUT /personnes/{idPersonne}
    }