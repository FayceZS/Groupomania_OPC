import React, { Component } from "react";
import { list } from "../post/apiPost";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";



class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    list(isAuthenticated().token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  }

  renderPosts = (posts) => (
     
   

    <div className = "publicationsContainer">
      {
      
      
      posts.map((post, i) => (
        
        <div
          className="jumbotron jumbotron-fluid "
          key={i}
        >
          <img className="card-img-top postImg" src={post.ImageSource} alt={post.titre}  />
          <div className="card-body">
              <div  className="card-bodyContentHome">
                <h5 className="card-title">
                  {post.titre}
                </h5>
                <p className="card-text">{post.Texte.length > 35 ? `${post.Texte.substring(0,35)}...`: post.Texte}</p>
                
              </div>
            </div>
            <Link to={`post/${post.id}`} className="btn btn-raised btn-primary btn-small" id="goPost">
              Voir le poste
            </Link>
            <div id="postsDetails">

              <p id = "datePost">{post.createdAt.substring(0,10).split()}</p>
              {/* <p>{console.log(post.createdAt.substring(0,10).split())}</p> */}
              
              <p id='authorPost'>Auteur : {post.auteur}</p>
            </div>
            

        </div> 

        


      ))
      
      
      }
    </div>
  );

  render() {
    const { posts} = this.state;
    
    return (
      <div className="container" >
        
        {this.renderPosts(posts)}
      </div>
    );
  }
}

export default Posts;
