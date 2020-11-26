const express = require('express');
const Sequelize = require('sequelize');



const {publication} = require('../models');



exports.getAllPosts = (req,res,next) => {
    
    publication.findAll()
    .then((publications)=>{
      res.send(publications)
      
    })
    .catch(err => {console.log(err)})
  
}; 


exports.getThisPost = (req,res,next) => {
    
    publication.findOne(
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

exports.createPost = (req,res,next) => {

        console.log(req.body)

        const createThisPost =()=>{
          
          
          if(req.file){
          
          publication.create(

            {
           idUser : req.body.userId,
           auteur : req.body.auteur,
           ImageSource : `${req.protocol}://${req.get('host')}/image/${req.file.filename}` ,
           Texte : req.body.Texte,
           Points : 0,
           titre : req.body.titre,
           
           })
           .then(() => res.status(201).json({message : "publication crée"}))
           .catch(err => {console.log(err)}) 
           
         
        }else{
          publication.create(

            {
           idUser : req.body.userId,
           auteur : req.body.auteur,
           Texte : req.body.Texte,
           Points : 0,
           titre : req.body.titre,
           
           })
        .then(() => res.status(201).json({message : "publication crée"}))
        .catch(err => {console.log(err)}) 
        }};
        
         
        createThisPost();
        
}

exports.deleteThisPost = (req,res,next) => {

    publication.destroy(
        {where : {id: req.body.id}}
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
  }


  exports.modifyThisPost = (req,res,next) => {

    const postUpdated = req.body;
    if(req.file){
        const updatePost = ()=>{
        publication.update({Texte : postUpdated.texte}, {where : { id : postUpdated.id}})
        publication.update({titre : postUpdated.titre}, {where : { id : postUpdated.id}})
        publication.update({ImageSource : `${req.protocol}://${req.get('host')}/image/${req.file.filename}`}, {where : { id : userID}})
        .then(() => {res.status(201).json({message: 'Publication bien modifié' });})
        .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
        }
    
        updatePost();
    
        } else {
          const updatePost = ()=>{
            publication.update({Texte : postUpdated.texte}, {where : { id : postUpdated.id}})
            publication.update({titre : postUpdated.titre}, {where : { id : postUpdated.id}})
            .then(() => {res.status(201).json({message: 'Publication bien modifié' });})
            .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
          } 
    
          updatePost();
  }};

  

