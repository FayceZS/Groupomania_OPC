import React, {Component} from "react"
import {Redirect} from 'react-router-dom'
import {isAuthenticated} from '../auth/index';
import {remove} from './apiUser'



class DeleteUser extends Component{

    state = {
        redirect : false
    };

    deleteAccount = ()=>{
        
        const token = isAuthenticated().token;
        const userId = this.props.userId;
        remove(userId, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                localStorage.clear();

                this.setState({redirect : true})
            }
        })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?");
        if(answer){
            this.deleteAccount()
        }
    }

    render(){


    if(this.state.redirect){
                return <Redirect to='/'/>
        }


    return(
        <button onClick = {this.deleteConfirmed} className = "btn btn-raised btn-danger ml-5">
                                            Supprimer Profil
            </button>
    )


        }};



export default DeleteUser        
    
            

