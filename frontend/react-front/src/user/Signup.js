import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {signup} from "../auth";

class Signup extends Component {


    
    constructor(){
        super()
        this.state = {
            
    prenom:"" ,
    nom:"" ,
    sexe: "",
    fonction: "",
    mail: "",
    password: "",
    error : '',
    loading : false,
    redirectToReferer : false

        }
    }

    handleChange = name => event => {
        this.setState({ [name] : event.target.value});
    };

    clickSubmit = event => {
        event.preventDefault()
        const {prenom,nom,sexe,fonction,mail,password} = this.state
        const user = {
            prenom ,
            nom ,
            sexe ,
            fonction ,
            mail ,
            password : password,
            
        }

       signup(user)
       .then(data =>{
           if(data.error) this.setState( {error : data.error});
           else
            this.setState({
                error : '',
                prenom:"" ,
                nom:"" ,
                sexe: "",
                fonction: "",
                mail: "",
                loading : true,
                redirectToReferer : true
                
            })
       });
    }
        
    
    

    render() {

        const {error,redirectToReferer} = this.state;

        if(redirectToReferer){

            return <Redirect to='/signin'/>
        }

        return(

            
            <div className='container'>
                                                                <h1>Groupomania</h1>
                <h2 className="mt-5 mb-5">Inscrivez-vous :</h2>

                    <form id="formulaireCommande" method="POST">
                        <div className="form-group">


                            <label className='text-muted'>Prénom</label>
                            <input onChange={this.handleChange('prenom')} type="text" id="prenom" name="prenom"   required className="form-control" value={this.state.prenom}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Nom</label>
                         <input onChange={this.handleChange('nom')} type="text" id="nom" name="nom"   required className="form-control" value={this.state.nom}/>
                        
                         </div>

                         <div className="form-group custom-control custom-radio">    Sexe


                                <div className="custom-control custom-radio">
                                        <input onChange={this.handleChange('sexe')}  type="radio" className="custom-control-input" id="defaultUnchecked" value='m' name="defaultExampleRadios"/>
                                        <label className="custom-control-label" htmlFor="defaultUnchecked" >Mâle</label>
                                        </div>


                                        <div className="custom-control custom-radio">
                                        <input onChange={this.handleChange('sexe')} type="radio" className="custom-control-input" id="defaultChecked" value='f' name="defaultExampleRadios"  />
                                        <label className="custom-control-label" htmlFor="defaultChecked">Female</label>
                                </div>
                        
                         </div>     

                         <div className="form-group">


                            <label className='text-muted'>Fonction</label>
                            <input onChange={this.handleChange('fonction')} type="text" id = "fonction" name="fonction" required className='form-control' value={this.state.fonction}/>
                        
                         </div>

                         <div className="form-group">


                            <label className='text-muted'>Adresse électronique</label>
                            <input onChange={this.handleChange('mail')} type="email" id="mail" name="mail" required className="form-control" value={this.state.mail}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Mot de passe </label>
                         <input onChange={this.handleChange('password')} type="password" id="password" name="password"  required className="form-control" value={this.state.password}/>
                        
                         </div>

                        
                        
                        
                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Envoyer</button>
                        
                        
                        { this.state.loading ? <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div> : "" }

                        <div 
                            className = 'alert alert-danger'
                            style = {{display : error ? "" : "none"}}>

                                {this.error}
                        </div>


                    </form>
            </div>
        );
    }
}


export default Signup