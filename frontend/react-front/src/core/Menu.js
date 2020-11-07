import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import{ signOut, isAuthenticated} from '../auth'



const isActive = (history,path) => {
    if(history.location.pathname === path) return {color : '#303030'}
    else{ return {color : "#ffffff"}}
}



const Menu = ({history}) => (
    <div className="bg-primary">
        <ul className="nav nav-pills nav-fill ">
            
                <li className="nav-item">
                <Link className="nav-link font-weight-bold text-lg-left" style ={isActive(history,"/")} to='/' id="accueil" ><p>Accueil</p></Link>
                </li>
           

                {!isAuthenticated() && (
                    <div id="Unauthenticated">
                        
                            <li className="nav-item">
                            <Link className="nav-link font-weight-bold text-lg-center" style ={isActive(history,"/signin")} to='/signin' ><p className = "">Se connecter</p></Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link font-weight-bold text-lg-center" style ={isActive(history,"/signup")} to='/signup' ><p>S'inscrire</p></Link>
                            </li>
                          
                      </div>      
                )}

                {isAuthenticated() &&(
                    <>
                        <li className="nav-item">
                            <div className="nav-link font-weight-bold text-lg-right" >
                                <Link to = {`/user/${isAuthenticated().userId}`} style = {isActive(history,`/user/${isAuthenticated().userId}`)}><p className = "" >{(JSON.parse(localStorage.getItem('jwt'))).prenom}</p></Link>
                                
                             </div>
                         </li>

                        <li className="nav-item">
                            <div className="nav-link font-weight-bold text-lg-right" style ={isActive(history,"/signup")} onClick={()=>signOut(()=>{history.push('/')})} ><p>Deconnexion</p></div>
                        </li>
                    </>
                )}
                
                
  
        </ul>       
    </div>
)

export default withRouter(Menu)

