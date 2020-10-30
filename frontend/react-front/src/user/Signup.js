import React, { Component } from 'react';


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
    error : ''

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
            password : password
        }

       this.signup(user)
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
                
                
            })
       });
    }
        
    
    signup = user => {

         
        return    fetch("http://localhost:3000/auth/signup",{
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            return response.json()
        })
        .catch(console.log("erreur"));

       // return   this.signup;
    };

    render() {

        // const {prenom,nom,sexe,fonction,mail,password} = this.state; 

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
                        
                        



                    </form>
            </div>
        );
    }
}


export default Signup