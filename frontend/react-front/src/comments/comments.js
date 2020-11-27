import React, { Component } from 'react';
import {createComment,removeComment} from './apiComment';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import{getCommentsOfPost} from './apiComment';

class Comments extends Component {

    state = {
        text : "",
        commentaires : []
    }

    componentDidMount = ()=>{
        getCommentsOfPost(isAuthenticated().token,document.location.href.split('/').pop())
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({commentaires : data});
                
            }
        })
    }

    handleChange = event => {
        this.setState({text : event.target.value})
    }

    addComment = e => {
            e.preventDefault()
            const userId = isAuthenticated().userId;
            const token = isAuthenticated().token;
            const postId = this.props.postId;
            const comment = this.state.text;
            const auteur = `${isAuthenticated().user.prenom} ${isAuthenticated().user.nom}`;
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
                    this.setState({test:""});
                    console.log(data.commentaire);
                    this.props.updateComments(data.commentaire);
                }
            })
    }


    
    
    

    renderComments = (commentaires) => (
     


        <div className="row" id="commentsContainer">
          {
          
          
          commentaires.map((comment, i) => (
            
            <div
              className="commentContainer"
              key={i}
            >
              
              
                    <p className="commentText">{comment.Texte}</p>
                    <p className="commentAuteur">
                      Auteur : {comment.auteur}
                    </p>
                    
                  
               
                
              
            </div> 
    
    
          ))
          
          
          }
        </div>
      );

    render() {

        const{commentaires} = this.state;
        

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