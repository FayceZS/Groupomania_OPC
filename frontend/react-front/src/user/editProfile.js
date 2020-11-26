import React, { Component } from 'react';
import {isAuthenticated} from '../auth/index';
import {read,update,updateUser} from './apiUser';
import {Redirect} from 'react-router-dom';

class EditProfile extends Component {

    constructor(){
    super()
    this.state = {
        id : ``,
        prenom : '',
        nom : '',
        mail : '',
        fonction : '',
        password : '',
        redirectToProfile : false,
        error : '',
        loading : false


    }}

    init = userId => {

        const token = isAuthenticated().token;

            read(userId,token)
            .then(data => {
            if(data.error){
                this.setState({redirectToProfile : true})
            } else{
                
                this.setState({id : userId, prenom : data.prenom, nom : data.nom, mail : data.mail, fonction : data.fonction,error : ''})
                
            }

        })

    }

    

    componentDidMount() {
        this.userData = new FormData()
        const userId = isAuthenticated().userId;
        this.init(userId);
        

        
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

        return true


    }

    handleChange = name => event => {
        
        const value = name === 'image' ? event.target.files[0] : event.target.value
        this.userData.set(name,value)
        this.setState({ [name] : value});
    };

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
        this.setState({loading:true})
        // const {id,prenom,nom,sexe,fonction,mail,password} = this.state
        //         const user = {
        //             id,
        //             prenom ,
        //             nom ,
        //             sexe ,
        //             fonction ,
        //             mail ,
        //             password : password || undefined,
        //             open : true
                    
        //         };
                
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        update(userId,token, this.userData)
        .then(data =>{
                if(data.error) this.setState( {error : data.error});
                else
                    updateUser(data, ()=>{
                        this.setState({
                        
                            redirectToProfile : true
                            
                        });
                    })
            });

        }
        
    }

    editForm = (prenom,nom,mail,fonction,password)=>(
        <form>

                        <div className="form-group">


                        <label className='text-muted'>Photo de profil</label>
                        <input onChange={this.handleChange('image')} type="file" accept = 'image/*' name="image"   required className="form-control" />

                        </div>



                        <div className="form-group">


                            <label className='text-muted'>Prénom</label>
                            <input onChange={this.handleChange('prenom')} type="text" id="prenom" name="prenom"   required className="form-control" value={this.state.prenom}/>
                        
                         </div>

                         <div className="form-group">


                         <label className='text-muted'>Nom</label>
                         <input onChange={this.handleChange('nom')} type="text" id="nom" name="nom"   required className="form-control" value={this.state.nom}/>
                        
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

                        

                    </form>
    )


    render() {

        const {id,prenom,nom,mail,fonction,password, redirectToProfile,error,loading} = this.state

        if(redirectToProfile){

         return   <Redirect to={`/user/${id}`} />
        }

        


        return (
            <div className = "container">
                
                <h2 className = "mt-5 mb-5">Modifier votre profil :</h2>

                    <div 
                            className = 'alert alert-danger'
                            style = {{display : error ? "" : "none"}}>

                                {error}
                    </div>

                    { loading ? (
                        <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div>)  : ("") }

                {this.editForm(prenom,nom,mail,fonction,password)}
            </div>
        );
    }
}

export default EditProfile;