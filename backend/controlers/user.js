const express = require('express');
const mysql = require ('mysql'); 
// import {user} from '../models/user';
// const User = require('../models/user');
const bCrypt = require('bcrypt');                           //On va utiliser bcrypt pour crypter le mot de passe de l'utilisateur
const jwt = require('jsonwebtoken');

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



const con= mysql.createConnection ({             //On se connecte à notre base de données mySQL
  host: 'localhost',
  user: 'root',
  password: 'Fayssal02',
  database : "groupomania"
  
 });

exports.getAllUsers = (req,res,next) => {
    con.query('SELECT * FROM user ', (err, lignes) => {
        if (err) throw err;
      
        console.log('Données reçues de Db:');
        console.log(lignes);
    
        lignes.forEach((ligne) => {
            console.log (`${ligne.prenom} est  ${ligne.fonction}`);
          });
    
    
          
      })
  
};


    exports.signup = (req,res) => {
      
            bCrypt.hash(req.body.password, 10)                          //Grâce à bcrypt on crypte 10 fois le mot de passe de l'utilisateur avant de l'envoyer à la base de données
              
              .then (async  hash =>  {
                    const newUser = new User(req.body.prenom,req.body.nom,req.body.sexe,req.body.fonction,req.body.mail,hash);
                    await con.query ('INSERT INTO user SET?', newUser, (err, res) => {
                      if (err) return err
                      else{ console.log (`${req.body.prenom} à bien était ajouté`);
                            
                            () => res.status(201).json({message : "utilisateur crée"});  
                          };
                          
                       
                    }
                    )
                    
                    
                    
                   
                  })
                  .catch(error => res.status(500).json({error}));
             
    };

    exports.signin = (req,res) => {
      console.log(req.body);
      if(req.body.mail === "test@mail.com"){
      return res.status(201).json({message : "Connecté"});
      }

      else{
        return res.status(401).json({error : "Utilisateur introuvable"})
      }



    }