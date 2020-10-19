

// console.log(localStorage);
const panierVide = document.querySelector(".panierVide");           
const formulaire = document.querySelector("#formulaireCommande");
const productContenairCaddy = document.querySelector("#productsContenairCaddy");
let totalPrice = 0;         //On initialise une variable qui nous permettra de calculer le prix total
let panierProducts = []; ; //On récupére notre panier dans le local storage qu'on transformera en tableau pour s'en servir après via des boucles
const firstNameForm = document.querySelector("#prenom"); //On stocke les champs du formulaire dans des variables pour les utiliser plus tard
const lastNameForm = document.querySelector("#nom");
const sexeForm = document.querySelector("#sexe");
const fonctionForm = document.querySelector("#fonction");
const emailForm = document.querySelector("#mail");                         
const passwordForm = document.querySelector("password"); 
const submitButton = document.querySelector("#submitButton");
const inputs = document.querySelectorAll("input");



// submitButton.addEventListener("click",(e)=>{                                //On enlève le comportement par défaut du formulaire pour ne pas rafraichir la page à l'envoi
//     e.preventDefault();
// })

class  user {

    constructor(prenom, nom, sexe,fonction,mail,password) {
        this.prenom = prenom;
        this.nom = nom;
        this.sexe = sexe;
        this.fonction = fonction;
        this.mail = mail;
        this.password = password;
    }

    getName() {
        return this.prenom + " " + this.nom;
    }


    
};

submitButton.addEventListener("click",(e)=>{
        
    e.preventDefault();
    submitForm();

    });   

    const submitForm = ()=>{                    //On crée la fonction qui nous permettra d'envoyer notre formulaire

    const submitRequest = ()=>{
    let userToAdd = new user(firstNameForm.value,lastNameForm.value,sexeForm.value,fonctionForm.value,emailForm.value,passwordForm);  
    const xhr = new XMLHttpRequest();
    
    let requestToSend = {                                   //On crée l'objet attendu par l'API pour répondre correctement
        userToAdd
    } ;

    console.log(userToAdd);
    xhr.onload = ()=>{
        
        console.log("Requête bien envoyée");

        
    }
    xhr.open("POST", "http://localhost:3000/auth/signup", false);
    xhr.setRequestHeader("Content-Type", "application/json");
        
    xhr.send(JSON.stringify(requestToSend));                            //On converti l'objet au format JSON avant de l'envoyer
       
        
    }

    submitRequest();

    };

    


    
 