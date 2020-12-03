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
    redirectToReferer : false,
    open : false

        }
    }

    componentDidMount() {
        this.userData = new FormData();
        

        
    };

    handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value;
        this.userData.set(name,value);
        this.setState({ [name] : event.target.value});
        this.setState({error : ""});
    };

    isValid = () => {
        const{prenom,nom,mail,fonction,password} = this.state
        if(prenom.length < 2){
            this.setState({error : "Merci d'entrer un prénom valide"});
            return false 
        }
        if(nom.length < 2){
            this.setState({error : "Merci d'entrer un nom valide"});
            return false
        }

        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)){
            this.setState({error : "Merci d'entrer un mail valide"});
            return false
        }

        if(fonction.length < 4){
            this.setState({error : "Merci d'entrer une fonction valide"});
            return false
        }
        if(password.length >= 1 && password.length <6){
            this.setState({error : "Le mot de passe doit contenir au moins 6 caractères"});
            return false
        }

        if(password.length === 0){
            this.setState({error : "Merci d'entrer un mot de passe"});
            return false
        }

        return true


    }

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
        const {prenom,nom,sexe,fonction,mail,password} = this.state
        // const user = {
        //     prenom ,
        //     nom ,
        //     sexe ,
        //     fonction ,
        //     mail ,
        //     password : password,
        //     open : true
            
        // }
        
       signup(this.userData)
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
       });}
    }
        

    signupForm = (prenom,nom,sexe,fonction,mail,password) => (
        <form  method="POST" id="signupForm">
                        <div className="form-group">


                            <label className='text-muted'>Prénom</label>
                            <input onChange={this.handleChange('prenom')} type="text" name="prenom"   required className="form-control" value={this.state.prenom}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Nom</label>
                         <input onChange={this.handleChange('nom')} type="text"  name="nom"   required className="form-control" value={this.state.nom}/>
                        
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
                            <input onChange={this.handleChange('mail')} type="email"  name="mail" required className="form-control" value={this.state.mail}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Mot de passe </label>
                         <input onChange={this.handleChange('password')} type="password"  name="password"  required className="form-control" value={this.state.password}/>
                        
                         </div>

                         <div className="form-group">


                        <label className='text-muted'>Photo de profil</label>
                        <input onChange={this.handleChange('image')} type="file" accept = 'image/*' name="image"   required className="form-control updateButton" />

                        </div>

                        
                        
                        
                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Envoyer</button>
                        
                        
                        { this.state.loading ? <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div> : "" }

                        <div 
                            className = 'alert alert-danger'
                            style = {{display : this.state.error ? "" : "none"}}>

                                {this.state.error}
                        </div>

                        {/* <div

                            className="alert alert-info"
                            style = {{display : open ? "" : "none"}}>

                                Votre compte a bien était crée <Link to="/signin">Connectez-vous</Link>
                        </div> */}


                    </form>



    ) 
    
    

    render() {

        const {error,redirectToReferer,open,prenom,nom,sexe,fonction,mail,password} = this.state;

        if(redirectToReferer){

            return <Redirect to='/signin'/>
        }

        return(

            
            <div className='container'>
                                                                
                <h2 className="mt-5 mb-5 homeButtons">Inscrivez-vous :</h2>

                {this.signupForm(prenom,nom,sexe,fonction,mail,password)}
            </div>
        );
    }
}


export default Signup