import React, {Component} from 'react';
import Posts from '../post/posts';
import { isAuthenticated } from "../auth/index";
import NewPost from '../post/newPost';
import PrivateRoute from '../auth/privateRoutes'

class Home extends Component {

    constructor(){
    super()
    this.state = {
        
        user : {

        },
        loading : false,
        error : ''


    }}
    


render(){
    
    const {user,loading,error,} = this.state;
    
    return(
    <div className = "homeContainer">

         
        
           {!isAuthenticated() && (
            <div className="jumbotron">
                <h2>Accueil</h2>
                <p className="lead">Connectez-vous pour voir les publications</p>
            </div>
            )}         

            {isAuthenticated() && (
            <div className="container-fluid">
                
                
                <NewPost/>
                <Posts/>
            </div>
            )}
            
        
    </div>
    
    
)

}}

export default Home;