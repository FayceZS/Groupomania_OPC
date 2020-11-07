import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import { signin, authenticate} from '../auth/index';

class Signin extends Component {


    
    constructor(){
        super()
        this.state = {
            
    
    mail: "",
    password: "",
    error : "",
    redirectToReferer : false,
    loading : false
    

        }
    }

    handleChange = name => event => {
        this.setState({error : ''});
        this.setState({ [name] : event.target.value});
    };

   

    clickSubmit = event => {
        event.preventDefault();
        this.setState({loading : true});
        const {mail,password} = this.state
        const user = {
            
            mail ,
            password : password
        }

       signin(user)
       .then(data =>{
           if(data.error) this.setState( {error : data.error, loading : false});
           else
            {
                //authentification
                authenticate(data,()=>{
                    this.setState({redirectToReferer : true})
                })
                //redirection
                console.log("Utilisateur connecté");
                
            }
       });
    }
        
    
   

    render() {

        
        const {error,redirectToReferer,loading} = this.state;

        if(redirectToReferer){

            return <Redirect to='/'/>
        }
        return(

            
            <div className='container'>
                                                                <h1>Groupomania</h1>
                <h2 className="mt-5 mb-5">Connectez-vous :</h2>

                    <form id="formulaireCommande" method="POST">
                        

                        <div className="form-group">
                            <label className='text-muted'>Adresse électronique</label>
                            <input onChange={this.handleChange('mail')} type="email" id="mail" name="mail" required className="form-control" value={this.state.mail}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Mot de passe </label>
                         <input onChange={this.handleChange('password')} type="password" id="password" name="password"  required className="form-control" value={this.state.password}/>
                        
                         </div>

                        
                        <div 
                            className = 'alert alert-danger'
                            style = {{display : error ? "" : "none"}}>

                                {error}
                        </div>
                        
                        
                        { loading ? <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div> : "" }


                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Envoyer</button>
                        
                        



                    </form>
            </div>
        );
    }
}


export default Signin