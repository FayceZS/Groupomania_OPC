import React, { Component } from 'react';
import {singlePost,remove} from './apiPost'
import {isAuthenticated} from '../auth/index'
import {Link,Redirect,Route} from 'react-router-dom';
import EditPost from './editPost';
import Comments from '../comments/comments'

class SinglePost extends Component {
    state = {
        post : '',
        deleted : false,
        editing : false,
        titre : '',
        Texte : "",
        comments : []
    }

    componentDidMount = ()=> {
        const token = isAuthenticated().token;
        const postId = this.props.match.params.postId;
        singlePost(token,postId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({post : data,titre : data.titre,Texte : data.Texte});
                
            }
        })
    };

    updateComments = comments => {
        this.setState({comments})
    }

    deletePost = ()=>{
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({deleted : true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Etes-vous sûr de vouloir supprimer votre publication ?");
        if(answer){
            this.deletePost()
        }
    }

    isEditing = () => {
        if(this.state.editing == false){
        this.setState({editing : true})

        
            }

        else{
            this.setState({editing : false})  
        }
    }

    

    

    renderPost = (post)=>{

        

    return(
        <div className = "publicationContainer ">
     
      
      
      
        
       
        
          
          <div className="card-body">
              <div id="card-bodyContent">
                <img className="card-img-top" id="singlePostImg" src={post.ImageSource} alt={post.titre}  />  
                <h5 className="card-title">
                  {post.titre}
                </h5>
                
                <p className="card-text">{post.Texte}</p>
                
              </div>
            </div>
            <div className="publicationButtons">
                <Link to={`/`} className="btn btn-raised btn-primary btnEditPost" id="goHomeFromSinglePost">
                <i className='fas fa-warehouse w3-xlarge w3-text-white'></i>   Accueil
                </Link>

                {isAuthenticated() && isAuthenticated().userId === post.idUser &&
                <>

                    <button onClick = {this.isEditing} className = 'btn btn-raised btn-warning btnEditPost'>
                    <i class='far fa-address-card w3-xlarge w3-text-white'></i>   Modifier le post
                    </button>

                    <button onClick = {this.deleteConfirmed} className = 'btn btn-raised btn-danger btnEditPost'>
                    <i className='fas fa-trash w3-xlarge w3-text-white'></i>   Supprimer le post
                    </button>

                </>

            }

            {isAuthenticated().type == 'admin' && isAuthenticated() && isAuthenticated().userId != post.idUser&&
                <>

                    <button onClick = {this.isEditing} className = 'btn btn-raised btn-warning btnEditPost'>
                    <i class='far fa-address-card w3-xlarge w3-text-white'></i>   Modifier le post
                    </button>

                    <button onClick = {this.deleteConfirmed} className = 'btn btn-raised btn-danger btnEditPost'>
                    <i className='fas fa-trash w3-xlarge w3-text-white'></i>  Supprimer le post
                    </button>

                </>

            }

            {isAuthenticated().type == 'moderator'&& isAuthenticated() && isAuthenticated().userId != post.idUser &&
                <>

                    <button onClick = {this.isEditing} className = 'btn btn-raised btn-warning btnEditPost'>
                    <i class='far fa-address-card w3-xlarge w3-text-white'></i> Modifier le post
                    </button>

                    <button onClick = {this.deleteConfirmed} className = 'btn btn-raised btn-danger btnEditPost'>
                    <i className='fas fa-trash w3-xlarge w3-text-white'></i>   Supprimer le post
                    </button>

                </>

            }
            </div>
            <div id="postsDetails">
              {console.log(post.createdAt)}
              {/* <p>{post.createdAt.substring(0,10).split()}</p> */}
              <p id='datePostSingle'>{post.createdAt.substring(0,10).split()}</p>
              <p id='auteurPostSingle'>Auteur : {post.auteur}</p>
            </div>
         

        


      
      
      
      
    </div>

    )

    }
    



    render() {

        if(this.state.deleted){

        return   <Redirect to={`/`} />
       };

       
      
      

        const {post,comments} = this.state
        
        return (
            <div>
                
                {this.state.post ? this.renderPost(post) : ""}
                
                {
                            this.state.editing ? <EditPost/> : ""
                        }

                <Comments postId={post.id} comments = {comments} updateComments={this.updateComments}/>
            </div>
        );
    }
}

export default SinglePost;