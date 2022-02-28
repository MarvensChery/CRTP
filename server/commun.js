module.exports.fillMain = 
function fillMain(user){
    function capitalizeFirstLetter(string) { //fonction qui permet de mettre majuscule à la premier lettre d'une donnée
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let Nom =  user['NomFamille'];
    let Prenom1 = user['Prenom1'];
    let Prenom2;
    if(user['Prenom2'] != null){
    Prenom2 = user['Prenom2'];
    }
    
    let DDN = user['DateNaissance'];
    const DateDN = DDN.replace("T00:00:00.000Z", "");
    let sexe;
    if(user['Masculin'] == 1){
    sexe = 'Homme';
    } else {
    sexe = 'Femme';
    }
    

      const html = `<div class="testbox "> 
      <form action="/menu">
        <div>
            <button style="margin-bottom: 5%;">
                Retour au menu de recherche
            </button>
        </div>
        <div style="margin-bottom: 5%">
        <div class="banner">
        </div>
        <h1 style="height:135px; text-align:center; font-size: 15px; padding-top: 10%; " >&nbsp;&nbsp;IPPE - Interrogation - Personne</h1>
        </div>
        <p1>
          <div style="font-size: 20px">Demande de vérification pour:</div> <br>
          <div style="text-align: right;"><b>Réponse 1</b><br></div>

          <div class="columns is-mobile">
            <div class = "info column is-half " style="text-align:left; font-size: 19px">Nom:</div>
            <div id="NomFamille" class = "info column is-one-third" style="text-align:left; font-size: 19px"> </div>
         </div>
          
         <div class="columns is-mobile">
            <div class = "info column is-half" style="text-align:left; font-size: 19px">Prénom 1:</div>
            <div id="Prenom1" class = "info column is-one-third" style="text-align:left; font-size: 19px"></div>
        </div>

        <div class="columns is-mobile">
            <div class = "info column is-half" style="text-align:left; font-size: 19px">Prénom 2:</div>
            <div id="Prenom2" class = "info column is-one-third" style="text-align:left; font-size: 19px"></div>
        </div>

        <div class="columns is-mobile">
            <div class = "info column is-half" style="text-align:left; font-size: 19px">Sexe: </div>
            <div id="Masculin" class = "info column is-one-third" style="text-align:left; font-size: 19px"></div>
        </div>

        <div class="columns is-mobile">
            <div class = "info column is-half" style="text-align:left; font-size: 19px">Date de naissance: </div>
            <div id="DDN" class = "info column is-one-third" style="text-align:left; font-size: 19px"></div>
        </div>

        <div class="columns is-mobile">
          <div class = "info column is-half" style="text-align:left; font-size: 19px">Remarque: </div>
          <div id="Remarque" class = "info column is-one-third" style="text-align:left; font-size: 19px">Etudiant</div> 
        </div>

        <div class="columns is-mobile">
          <div class = "info column is-half" style="text-align:left; font-size: 19px">Matricule: </div> 
          <div id="Matricule" class = "info column is-one-third" style="text-align:left; font-size: 19px">1234</div>
        </div>
        <br>
          <div style= "font-size: x-large;"><b></b></div>
        </p1>
        </div>
        </div>
        <div class="btn-block">
        </div>
      </form>
    </div>`
    document.getElementById('info').insertAdjacentHTML('beforeend', html);
    document.getElementById('NomFamille').innerHTML = capitalizeFirstLetter(Nom);
    document.getElementById('Prenom1').innerHTML = capitalizeFirstLetter(Prenom1);
    document.getElementById('Prenom2').innerHTML = capitalizeFirstLetter(Prenom2);
    document.getElementById('Masculin').innerHTML = sexe;
    document.getElementById('DDN').innerHTML = DateDN;

  }

