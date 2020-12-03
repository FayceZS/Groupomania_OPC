import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import {read,updateUser} from './apiUser';
import DeleteUser from './deleteUser';


class Profile extends Component{
    
    constructor(){
        super()
        this.state = {
            user : "",
            redirectToSignin : false,
            error : ''

        }
    }


    


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
        
        const userId = this.props.match.params.userId;
        this.init(userId);
        

        
    };

    componentWillReceiveProps(props) {
        
        const userId = isAuthenticated().userId;
        this.init(userId);
        

        
    };


    render(){


        const {redirectToSignin, user} = this.state;

        if(redirectToSignin) return <Redirect to="signin"/>;
        updateUser(user,()=>{
            console.log('Utilisateur mis à jour')
            
                
        }
        );
        
        return(

        
        
        <div className = 'container uniqueProfilContainer'>

            
            <div className="row">
                    <div className = "col-md-6">
                            
                            
                            <img className="card-img-top" src={`${user.imageUrl}`} alt={user.prenom} style={{width : '85%'}} />
                            
                    </div>

                    <div className = "col-md-6">

                        <div className = "d-inline-block mt-5">
                                        <div className = "lead mt-2 ">
                                            <p> {user.prenom} {user.nom}</p>
                                            <p>{`Fonction : ${user.fonction}`}</p>
                                            
                                        </div>

                        {isAuthenticated() && isAuthenticated().userId === user.id  &&(

                            
                                    <div>
                                        <Link className = "btn btn-raised ml-5 " id="modifyProfilUser" to= {`/user/edit/${user.id}`}>
                                                Modifier Profil
                                        </Link>
                                        <DeleteUser userId = {user.id} />
                                    </div>

                            
                        )

                        }  

                        {isAuthenticated().type === "moderator"&&isAuthenticated() && isAuthenticated().userId !== user.id  &&(

                                                    
                        <div>
                            <Link className = "btn btn-raised ml-5 " id="modifyProfilUser" to= {`/user/edit/${user.id}`}>
                                    Modifier Profil
                            </Link>
                            <DeleteUser userId = {user.id} />
                        </div>


                        )

                        }  

                            {isAuthenticated().type === "admin"&&isAuthenticated() && isAuthenticated().userId !== user.id  &&(

                                                                                
                            <div>
                                <Link className = "btn btn-raised ml-5 " id="modifyProfilUser" to= {`/user/edit/${user.id}`}>
                                        Modifier Profil
                                </Link>
                                <DeleteUser userId = {user.id} />
                            </div>


                            )

                            }  

                        </div>
                    </div>
            </div>
        </div>
        
            );
    }
}

export default Profile