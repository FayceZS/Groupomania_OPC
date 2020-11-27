import React, {Component} from 'react';
import Posts from '../post/posts';
import { isAuthenticated } from "../auth/index";
import NewPost from '../post/newPost';
import {read} from '../user/apiUser';
import Signin from '../user/Signin';

class Home extends Component {

    constructor(){
    super()
    this.state = {
        
        user : "",
        loading : false,
        error : ''


    }}



    init = userId => {

        const token = isAuthenticated().token;

            read(userId,token)
            .then(data => {
            if(data.error){
                this.setState({redirectToSignin : true})
            } else{
                
                this.setState({user : data})
                
            }

        })

    }

    

    componentDidMount() {
        
        if(isAuthenticated().user){
        this.init(isAuthenticated().user.id);
        }

        
    };

    componentWillReceiveProps() {
        if(isAuthenticated().user){
        const userId = isAuthenticated().user.id;
        this.init(userId);
        }

        
    };

    
    


render(){
    
    const {user} = this.state;
    
    return(
    <div className = "homeContainer">

         
        
           {!isAuthenticated() && (
            <div className="jumbotron" id="accueilDisconnect">
                <h2>Accueil</h2>
                
                <Signin/>
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