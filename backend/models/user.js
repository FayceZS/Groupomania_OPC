const express = require('express');


// const user = {
//     // idUser: `E9`,
//     prenom: this.prenom,
//     nom: this.nom,
//     sexe: this.sexe,
//     fonction: this.fonction,
//     mail: this.mail,
//     password: this.password};


// class  User {

//         constructor(prenom, nom, sexe,fonction,mail,password) {
//             this.prenom = prenom;
//             this.nom = nom;
//             this.sexe = sexe;
//             this.fonction = fonction;
//             this.mail = mail;
//             this.password = password;
//         }
    
//         getName() {
//             return this.prenom + " " + this.nom;
//         }
    
    
        
//     };


module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        prenom : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        nom : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        sexe : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        fonction : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        mail : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }

    });

    return User
}


