import React, { Component } from 'react';
import {createComment,removeComment} from './apiComment';
import {isAuthenticated} from '../auth/index';

import{getCommentsOfPost} from './apiComment';

class Comments extends Component {

    state = {
        text : "",
        commentaires : [],
        deleted : false,
        showDelete : false
    }

    
    
    componentDidMount = ()=>{
        
        getCommentsOfPost(isAuthenticated().token,document.location.href.split('/').pop())
        .then(data => {
            if(data.error && data !== undefined){
                console.log(data.error)
            }else{
                this.setState({commentaires : data});
                
            }
        })
    }

    handleChange = event => {
        this.setState({text : event.target.value})
    }

    deleteComment = (idToDelete)=>{
        
        const token = isAuthenticated().token;
        removeComment(idToDelete,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({deleted : true})
                
            }
        })
    }

    

   deleteConfirmed = (commentaires,i) => {
        
       const idToDelete = commentaires[i].id;
        
        let answer = window.confirm("Etes-vous sûr de vouloir supprimer votre commentaire ? ");
        
         if(answer){
            this.deleteComment(idToDelete)
        }
    }

    addComment = e => {
            e.preventDefault()
            const userId = isAuthenticated().userId;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            const comment = this.state.text;
            const auteur = `${isAuthenticated().prenom} ${isAuthenticated().nom}`;
            const commentToSend = {
                user_id : userId,
                Texte : comment,
                auteur : auteur,
                idPost : postId
            };

            createComment(userId,token,commentToSend)
            .then(data => {
                if(data.error){
                    console.log(data.error)
                }else{
                    this.setState({text:""});
                    console.log(data.commentaire);
                    this.props.updateComments(data.commentaire);
                    window.location.reload();
                }
            })
    }


    deleteIcon = (commentaires,i)=>{
        if(isAuthenticated().type === 'admin' || isAuthenticated().userId === this.commentaires[i].user_id){
            this.setState({showDelete : true})
        }
    }   
    
    

    renderComments = (commentaires) => (
     


        <div className="row" id="commentsContainer">
          {
          
          
          commentaires.map((comment, i) => (
            
            <div
              className="commentContainer"
              
              key={i}
            >

                   
                    


                    
                    
                    

                   {isAuthenticated() && isAuthenticated().userId === comment.user_id && <> <button onClick={this.deleteConfirmed.bind(this,commentaires,i)} className='fas fa-trash w3-xlarge w3-text-red commentIcon'></button></>}
                   {isAuthenticated().type === 'moderator' && isAuthenticated().userId !== comment.user_id && <> <i className='fas fa-trash w3-xlarge w3-text-red commentIcon' onClick = {this.deleteConfirmed.bind(this,commentaires,i)}></i></>}
                   {isAuthenticated().type === 'admin' && isAuthenticated().userId !== comment.user_id && <> <button onClick={this.deleteConfirmed.bind(this,commentaires,i)} className='fas fa-trash w3-xlarge w3-text-red commentIcon'></button></>}
                    <p className="commentText">{comment.Texte}</p>
                    <p className="commentAuteur">
                      Auteur : {comment.auteur}
                    </p>
                    {/* <>{console.log('on est là' + idCommentDelete)}</> */}

                    
                    
                  
               
                
               
            </div> 
    
         
          ))
          
          
          }
        </div>
      );

   deleteIcon = (commentaires,i)=>{
        if(isAuthenticated().type === 'admin' || isAuthenticated().userId === this.commentaires[i].user_id){
            this.setState({showDelete : true})
        }
    }

    render() {

        const{commentaires,deleted} = this.state;

        if(deleted){
            window.location.reload();
        }

        
        

        return (
            <div>
                <h2 className = "mt-5 mb-5">Laisser un commentaire</h2>
                <form onSubmit = {this.addComment}>
                    <div className='form-group'>
                    
                        <input type = "text" onChange = {this.handleChange} className="form-control" id="commentInput" placeholder="Ecrivez un commentaire"/>
                    </div>
                </form>

                {this.renderComments(commentaires)}
                
            </div>

            
        );
    }
}

export default Comments;