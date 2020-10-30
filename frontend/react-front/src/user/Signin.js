import React, { Component } from 'react';


class Signin extends Component {


    
    constructor(){
        super()
        this.state = {
            
    
    mail: "",
    password: "",
    error : "",
    redirection : false
    

        }
    }

    handleChange = name => event => {
        this.setState({error : ''});
        this.setState({ [name] : event.target.value});
    };

    clickSubmit = event => {
        event.preventDefault()
        const {mail,password} = this.state
        const user = {
            
            mail ,
            password : password
        }

       this.signin(user)
       .then(data =>{
           if(data.error) this.setState( {error : data.error});
           else
            {
                //authentification
                //redirection
                console.log("Utilisateur connecté");
                
            }
       });
    }
        
    
    signin = user => {

         
        return    fetch("http://localhost:3000/auth/signin",{
            method : "POST",
            headers : {
                Accept : "application/json",
                "Content-type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            
            return res.json()
            
        })
        .catch(res => {
            if(res.status===401){
                console.log("Utilisateur plomb")
            }
        })

      
    };

    render() {

        
        const {mail,password,error} = this.state;
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
                        
                        <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>Envoyer</button>
                        
                        



                    </form>
            </div>
        );
    }
}


export default Signin