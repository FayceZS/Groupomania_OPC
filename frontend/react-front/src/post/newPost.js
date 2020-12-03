import React, { Component } from 'react';
import {isAuthenticated} from '../auth/index';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom';
import Posts from './posts';
import {read} from '../user/apiUser';

const formContainer = document.querySelector(".formContainer");

class NewPost extends Component {

    constructor(){
    super()
    this.state = {
        titre : '',
        Texte : '',
        error : '',
        user : {

        },
        auteur : '',
        loading : false,
        redirectToHome : false


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
        this.setState({user : {id : isAuthenticated().userId,prenom : isAuthenticated().prenom,}});
        const userId = isAuthenticated().userId;
        this.init(userId);
        
        this.postData = new FormData();

        
    };

    isValid = () => {
        const{titre,Texte} = this.state
        if(titre.length < 3){
            this.setState({error : "Merci d'entrer un titre avec au moins 3 caractères"});
            return false
        }
        if(Texte.length < 1){
            this.setState({error : "Merci d'entrer une description"});
            return false
        }

       

        return true


    }

    handleChange = name => event => {
        
        const value = name === 'image' ? event.target.files[0] : event.target.value
        this.postData.set("userId",isAuthenticated().userId);
        this.postData.set('auteur',`${isAuthenticated().prenom} ${isAuthenticated().nom}` )
        this.postData.set(name,value);
        this.setState({ [name] : value});
    };

    clickSubmit = event => {
        event.preventDefault()
        if(this.isValid()){
        this.setState({loading:true})
        const {idUser,titre,Texte,Points,auteur} = this.state
                const publication = {
                    idUser,
                    titre ,
                    Texte ,
                    Points ,
                    auteur
                    
                };  
        const userId = isAuthenticated().userId;
        const token = isAuthenticated().token;
        create(userId,token, this.postData)
        .then(data =>{
                if(data.error) this.setState( {error : data.error});
                else
                    this.setState({loading : false,titre : "",Texte : '',redirectToHome : true})
            });

        }
        
    }

    newPostForm = (titre,Texte,idUser,auteur)=>(
        <form className='formContainer'>

                        



                        <div className="form-group">


                            <label className='text-muted'>Titre</label>
                            <input onChange={this.handleChange('titre')} type="text" id="titre" name="titre"   required className="form-control" value={this.state.titre}/>
                        
                         </div>

                         

                        

                         <div className="form-group">


                            <label className='text-muted'>Texte</label>
                            <textarea onChange={this.handleChange('Texte')} type="text" id = "textezone" name="textezone" required className='form-control' value={this.state.Texte}/>
                        
                         </div>

                         
                         

                        <div className="form-group">


                            <label className='text-muted'>Photo de profil</label>
                            <input onChange={this.handleChange('image')} type="file" accept = 'image/*' name="image"   required className="form-control" />

                        </div>  

                        
                        
                        
                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Créer ma publication</button>
                        
                        
                        { this.state.loading ? <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div> : "" }

                        

                    </form>
    )


    render() {

        const {titre,Texte,user,error,redirectToHome,auteur} = this.state;
        const idUser = isAuthenticated().userId;
        
        if(redirectToHome){

        
        
        window.location.reload();
        }

        


        return (
            <div className = "postContainer" id='homePost'>
                
                <h2 className = "mt-5 mb-5">Créer un nouveau post :</h2>

                    <div 
                            className = 'alert alert-danger'
                            style = {{display : error ? "" : "none"}}>

                                {error}
                                
                    </div>

                    
                
                {this.newPostForm(titre,Texte,idUser,auteur)}
            </div>
        );
        

    }
}

export default NewPost; 