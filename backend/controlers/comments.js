const express = require('express');
const Sequelize = require('sequelize');



const {commentaire} = require('../models');



exports.getAllcomments = (req,res,next) => {
    
    commentaire.findAll({where : {idPost: req.params.id}})
    .then((commentaires)=>{
      res.send(commentaires)
      
    })
    .catch(err => {console.log(err)})
  
}; 


exports.getThisComment = (req,res,next) => {
    
    commentaire.findOne(
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

exports.createComment = (req,res,next) => {

        commentaireCreated ={
          user_id : req.body.user_id,
          auteur : req.body.auteur,
          Texte : req.body.Texte,
          idPost : req.body.idPost,
          
          
          };
      
        
          
          
          
          
          commentaire.create(

            {
           user_id : req.body.user_id,
           auteur : req.body.auteur,
           Texte : req.body.Texte,
           idPost : req.body.idPost,
           
           
           })
           .then(() => res.status(201).json({message : "commentaire crée",commentaire : commentaireCreated}))
           .catch(err => {console.log(err)}) 
           
         
        
        
        
}

exports.deleteThisComment = (req,res,next) => {
    
    commentaire.destroy(
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
  }


  exports.modifyThisComment = (req,res,next) => {

    const commentUpdated = req.body;
    
          const updateComment = ()=>{
            commentaire.update({Texte : commentUpdated.texte}, {where : { id : commentUpdated.id}})
            commentaire.update({titre : commentUpdated.titre}, {where : { id : commentUpdated.id}})
            .then(() => {res.status(201).json({message: 'Commentaire bien modifié' });})
            .catch(()=>{res.status(400).json({error : "Le profil n'a pas était rempli correctement"})});
          
    
          updateComment();
  }};