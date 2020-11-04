const express = require('express');
const mysql = require ('mysql'); 
// import {user} from '../models/user';
// const User = require('../models/user');
const bCrypt = require('bcrypt');                           //On va utiliser bcrypt pour crypter le mot de passe de l'utilisateur
const jwt = require('jsonwebtoken');
const {user} = require('../models');




// const con= mysql.createConnection ({             //On se connecte à notre base de données mySQL
//   host: 'localhost',
//   user: 'root',
//   password: 'Fayssal02',
//   database : "groupomania"
  
//  });

exports.getAllUsers = (req,res,next) => {
    user.findAll()
    .then((users)=>{
      res.send(users)
      
    })
    .catch(err => {console.log(err)})
  
};




    exports.signup = (req,res) => {
            
            bCrypt.hash(req.body.password, 10)                          //Grâce à bcrypt on crypte 10 fois le mot de passe de l'utilisateur avant de l'envoyer à la base de données
              
             
              .then(async hash=>
                
                user.create(
                  { 
                   prenom : req.body.prenom ,
                   nom : req.body.nom,
                   sexe : req.body.sexe,
                   fonction : req.body.fonction,
                   mail : req.body.mail,
                   password : hash
                 }
                
                
                 
                )
                .then(() => res.status(201).json({message : "utilisateur crée"}))
                
                  )
          .catch(error => res.status(500).json({error}));   
    };

    exports.signin = (req,res) => {
      // console.log(req.body);
      // if(req.body.mail === "test@mail.com"){
      // return res.status(201).json({message : "Connecté"});
      // }

      // else{
      //   return res.status(401).json({error : "Utilisateur introuvable"})
      // }

      user.findOne({where : {mail:req.body.mail}})                                                    //On récupère l'user qui veut se logger
        .then(user =>{
            if(!user){
                return res.status(401).json({error : "Utilisateur non trouvé"});
            }
            bCrypt.compare(req.body.password, user.password)                                    //bcrypt compare la chaine de caractère renvoyée par l'utilisateur à celle qu'il a crypté
            .then(valid => {
                if(!valid){                                                                         
                    return res.status(401).json({error : "Mot de passe incorrect"});
                }
                res.status(200).json({
                    userId : user._id,
                    token : jwt.sign(
                        {userId : user._id},
                        //'$2b$10$WZrlJ3lvO4jURC4dUM8b5uE7ZiBMoD3rhdHzd9HUm3/gTpVEEFLzO',
                        '$2b$10$WZrlJ3lvO4jURC4dUM8b5uE7ZiBMoD3rhdHzd9HUm3/gTpVEEFLzO',
                        {expiresIn : '24h'}
                    )
                });
            }

                )
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({error}));



    }