const express = require('express');


// const user = {
//     // idUser: `E9`,
//     prenom: this.prenom,
//     nom: this.nom,
//     sexe: this.sexe,
//     fonction: this.fonction,
//     mail: this.mail,
//     password: this.password};


class  User {

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



export {User};