import React, { Component } from 'react';
import{ singlePost,updatePost } from '../post/apiPost';
import {isAuthenticated} from '../auth/index';

class EditPost extends Component {
    constructor(){
        super()
        this.state = {
            id : '',
            titre : '',
            Texte : '',
            redirectToProfile : false,
            error : '',
            idUser : isAuthenticated().userId,
            idPost : document.location.href.split('/').pop()

        }
    }

    init = postId => {

        // const urlcourante = document.location.hrefreplace(/\/$/, "");
        // postId = document.location.hrefreplace(/\/$/, "").urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );

            singlePost(isAuthenticated().token,postId)
            .then(data => {
            if(data.error){
                this.setState({redirectToProfile : true})
            } else{
                
                this.setState({id : data.id, titre : data.titre, Texte : data.Texte,error : ''})
                
            }

        })

    }

    

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.state.idPost;
        this.init(postId);
        

        
    };

    clickSubmit = event => {
        event.preventDefault()
        
        
        const {idPost,idUser,titre,Texte} = this.state
                const publication = {
                    idPost,
                    idUser,
                    titre ,
                    Texte ,
                    
                };  
        const userId = this.state.idUser;
        const token = isAuthenticated().token;
        const postId = this.state.idPost;
        this.postData.set('id',postId);
        this.postData.set('userId',postId);
        updatePost(userId,token, this.postData)
        .then(data =>{
                if(data.error) this.setState( {error : data.error});
                else
                    this.setState({loading : false,titre : "",Texte : '',redirectToHome : true})
            });

        
        
    }

    handleChange = name => event => {
        
        const value = name === 'image' ? event.target.files[0] : event.target.value
        this.postData.set(name,value)
        this.setState({ [name] : value});
    };


     updatePostForm = (titre,Texte,idUser,auteur)=>(
        <form>

                        



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

                        
                        
                        
                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Modifier ma publication</button>
                        
                        
                        { this.state.loading ? <div className="jumbotron text-center">
                                        <p id="veriflogin">Chargement...</p>
                        </div> : "" }

                        

                        

                    </form>
    )

    render() {

const {titre,Texte,error} = this.state

        return (
            <div id='modifyFormulaireContainer'>
                <div className = "postContainer" id='modifyFormulaire'>
                    
                    <h2 className = "mt-5 mb-5">Modifier votre post :</h2>

                        <div 
                                className = 'alert alert-danger'
                                style = {{display : error ? "" : "none"}}>

                                    {error}
                        </div>


                    {this.updatePostForm(titre,Texte)}
                </div>
            </div>
        );
    }
}

export default EditPost;