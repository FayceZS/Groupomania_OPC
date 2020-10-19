const express = require('express');
const mysql = require ('mysql'); 
// import {user} from '../models/user';
// const User = require('../models/user');

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
            console.log (`${ligne.Prenom} habite à  ${ligne.villeEtudiant}`);
          });
    
    
          
      })
  
};

exports.addThisUser = (req,res,next) => {
    newUser = new User(req.body.userToAdd.prenom,req.body.userToAdd.nom,req.body.userToAdd.sexe,req.body.userToAdd.fonction,req.body.userToAdd.mail,"test");
    con.query ('INSERT INTO user SET?', newUser, (err, res) => {
        if (err) throw err;
      
        console.log ('ID dernière insertion:', res.insertId);
        console.log(res);
      });
    

    console.log(req.body.userToAdd.prenom);

};



