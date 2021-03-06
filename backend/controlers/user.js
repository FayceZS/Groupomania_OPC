const express = require('express');
const mysql = require ('mysql'); 
const bCrypt = require('bcrypt');                           //On va utiliser bcrypt pour crypter le mot de passe de l'utilisateur
const jwt = require('jsonwebtoken');
const {user} = require('../models');
const Sequelize = require('sequelize');
const fs = require("fs");
const {publication} = require('../models')


exports.getThisUser = (req,res,next) => {
    
    user.findOne(
        {where : {id: req.params.id}}
      ).then(
        (user) => {
          
          res.status(200).json(user);
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      )
      .catch((error) => { res.status(500).json({error: error});});
};


exports.deleteThisUser = (req,res,next) => {

  const postsOfThisUser = publication.findAll({where : {idUser : req.params.id}});
  // console.log(postsOfThisUser);
  // let thisUser1;
  // const userToDelete = async ()=>{ thisUser = await user.findOne({where : {id: req.params.id}}); thisUser1 = thisUser.dataValues }
    
    
    
  
  // userToDelete()
  // console.log(thisUser1)

  user.destroy({where : {id: req.params.id}})
      
  //fs.unlink(`./images/user${req.params.id}.jpg`,(err=>{
    //   if(err) console.log(err)
    //   else {console.log("photo utilisateur supprimé")};
    // }));

  

  publication.destroy({where : {idUser : req.params.id}})


  .then(
      (user) => {
        res.status(200).json(user);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    )
  .catch((error) => { res.status(500).json({error: error});});
}

exports.modifyThisUser = (req, res, next) => {

  const userUpdated = req.body;
  const userID = req.params.id;
  console.log(` ID requête : ${req.params.id}`);

  if(!req.body.password){
    if(req.file){
    const updateUser = ()=>{
    user.update({prenom : userUpdated.prenom}, {where : { id : userID}})
    user.update({nom : userUpdated.nom}, {where : { id : userID}})
    user.update({fonction : userUpdated.fonction}, {where : { id : userID}})
    user.update({mail : userUpdated.mail}, {where : { id : userID}})
    user.update({imageUrl : `${req.protocol}://${req.get('host')}/image/${req.file.filename}`}, {where : { id : userID}})
    .then(() => {res.status(201).json({message: 'Profil bien modifié' });})
    .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
    }

    updateUser();

    } else {
      const updateUser = ()=>{
        user.update({prenom : userUpdated.prenom}, {where : { id : userID}})
        user.update({nom : userUpdated.nom}, {where : { id : userID}})
        user.update({fonction : userUpdated.fonction}, {where : { id : userID}})
        user.update({mail : userUpdated.mail}, {where : { id : userID}})
        .then(() => {res.status(201).json({message: 'Profil bien modifié' });})
        .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
      } 

      updateUser();
    }
  
  
    }else{ 
              bCrypt.hash(req.body.password, 10)   
            .then( async hash =>{
            
            if(!req.file){
            const updateUser = ()=>{
                user.update({prenom : userUpdated.prenom}, {where : { id : userID}})
                user.update({nom : userUpdated.nom}, {where : { id : userID}})
                user.update({fonction : userUpdated.fonction}, {where : { id : userID}})
                user.update({mail : userUpdated.mail}, {where : { id : userID}})
                user.update({password : hash}, {where : { id : userID}})
                .then(() => {res.status(201).json({message: 'Profil bien modifié' });})
                .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
              } 
            
            updateUser();
                  }else{
                    const updateUser = ()=>{
                      user.update({prenom : userUpdated.prenom}, {where : { id : userID}})
                      user.update({nom : userUpdated.nom}, {where : { id : userID}})
                      user.update({fonction : userUpdated.fonction}, {where : { id : userID}})
                      user.update({mail : userUpdated.mail}, {where : { id : userID}})
                      user.update({imageUrl : `${req.protocol}://${req.get('host')}/image/${req.file.filename}`}, {where : { id : userID}})
                      user.update({password : hash}, {where : { id : userID}})
                      .then(() => {res.status(201).json({message: 'Profil bien modifié' });})
                      .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
                      }
                  
                      updateUser();




        } 
  })}
  
  
  
  
  
  
  

};

// exports.modifyThisUser = (req, res, next) => {

//   console.log(req)
  

  
// };

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
                
              {
                if(req.file){
                 
                const createUser = ()=>{
                  console.log(req.file);
                user.create(
                  { 
                   prenom : req.body.prenom ,
                   nom : req.body.nom,
                   sexe : req.body.sexe,
                   fonction : req.body.fonction,
                   mail : req.body.mail,
                   password : hash,
                   imageUrl : `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
                   
                 })
                .then(() => {res.status(201).json({message: 'Utilisateur bien créé' });})
                //.catch(()=>{res.status(400).json({error : "L'utilisateur n'a pas pu être ajouté"})});
                .catch(error => {res.status(400).json({error})});
                }
            
                createUser()
            
                } else {
                  
                  const createUser = ()=>{
                  user.create(
                    { 
                     prenom : req.body.prenom ,
                     nom : req.body.nom,
                     sexe : req.body.sexe,
                     fonction : req.body.fonction,
                     mail : req.body.mail,
                     password : hash,
                    
                     
                   })
                    .then(() => {res.status(201).json({message: 'Utilisateur bien créé' });})
                    .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
                  
                  }

                  createUser();
                
                }
            
                  
                })
          .catch(error => res.status(500).json({error}));       
                  
           

          console.log(req.body)
    };

    exports.signin = (req,res) => {
      
      
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
                    userId : user.id,
                    prenom : user.prenom,
                    nom : user.nom,
                    mail : user.mail,
                    type : user.type,
                    token : jwt.sign(
                        {userId : user.id},
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



    };

    exports.signout= (req,res) => {
        
        return(res.status(200))
    };