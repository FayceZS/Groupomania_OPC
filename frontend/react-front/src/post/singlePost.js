import React, { Component } from 'react';
import {singlePost} from './apiPost'
import {isAuthenticated} from '../auth/index'
import {Link} from 'react-router-dom'

class SinglePost extends Component {
    state = {
        post : ''
    }

    componentDidMount = ()=> {
        const token = isAuthenticated().token;
        const postId = this.props.match.params.postId;
        singlePost(token,postId).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({post : data})
            }
        })
    };

    renderPost = (post)=>{

        

    return(
        <div className = "publicationContainer ">
     
      
      
      
        
       
        
          
          <div className="card-body">
              <div id="card-bodyContent">
                <h5 className="card-title">
                  {post.titre}
                </h5>
                <img className="card-img-top" id="singlePostImg" src={post.ImageSource} alt={post.titre}  />
                <p className="card-text">{post.Texte}</p>
                
              </div>
            </div>
            <Link to={`/`} className="btn btn-raised btn-primary btn-small" id="goHomeFromSinglePost">
              Retourner à l'accueil
            </Link>
            <div id="postsDetails">

              {/* <p>{post.createdAt.substring(0,10).split()}</p> */}
              <p>{post.createdAt}</p>
              <p>Auteur : {post.auteur}</p>
            </div>
         

        


      
      
      
      
    </div>

    )

    }


    render() {

        const {post} = this.state
        console.log(post)
        return (
            <div>
                
                {this.renderPost(post)}
            </div>
        );
    }
}

export default SinglePost;