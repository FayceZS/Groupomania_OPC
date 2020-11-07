import React, {Component} from 'react'
import { Redirect, Link } from 'react-router-dom';
import {isAuthenticated} from '../auth/index';
import {read} from './apiUser';


class Profile extends Component{
    
    constructor(){
        super()
        this.state = {
            user : "",
            redirectToSignin : false

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
                console.log(this.state.user.id);
            }

        })

    }

    

    componentDidMount() {
        
        const userId = this.props.match.params.userId;
        this.init(userId);
        

        
    };


    render(){


        const {redirectToSignin, user} = this.state;

        if(redirectToSignin) return <Redirect to="signin"/>


        return(

        
        
        <div className = 'container'>
            <div className="row">
                    <div className = "col-md-6">
                            <h2 className = "mt-5 mb-5">Profile</h2>
                            <p> Hello {isAuthenticated().prenom}</p>
                            <p>{`Tu nous a rejoint le ${new Date(user.createdAt).toDateString()}`}</p>
                    </div>

                    <div className = "col-md-6">

                        {isAuthenticated() && isAuthenticated().userId === user.id &&(
                            <div className = "d-inline-block mt-5">
                                        <Link className = "btn btn-raised mr-5" to= {`/user/edit/${user.id}`}>
                                                Modifier Profil
                                        </Link>
                                        <button className = "btn btn-raised btn-danger">
                                            Supprimer Profil
                                        </button>
                            </div>
                        )

                        }
                    </div>
            </div>
        </div>
        
            );
    }
}

export default Profile