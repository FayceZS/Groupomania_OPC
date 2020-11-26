import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import{ signOut, isAuthenticated} from '../auth'



const isActive = (history,path) => {
    if(history.location.pathname === path) return {color : '#303030'}
    else{ return {color : "#ffffff"}}
}



const Menu = ({history}) => (
    <nav>
        <ul className="nav nav-pills nav-fill ">
            
                <li className="nav-item">
                     {/* <div className="nav-link font-weight-bold text-lg-right" >    */}
                        <Link className="nav-link font-weight-bold text-lg-right" style ={isActive(history,"/")} to='/' id="accueil" ><p>Accueil</p></Link>
                     {/* </div>  */}
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
                            
                                <Link className="nav-link font-weight-bold text-lg-right" style ={isActive(history,"/")} to='/users' id="accueil" ><p>Collègues</p></Link>
                            
                        </li>

                        {/* <li className="nav-item">
                            
                                <Link className="nav-link font-weight-bold text-lg-right" style ={isActive(history,"/")} to='/post/createpost' id="createpost" ><p>Publications</p></Link>
                            
                        </li> */}
                        
                        <li className="nav-item">
                            
                                <Link className="nav-link font-weight-bold text-lg-right" to = {`/user/${isAuthenticated().userId}`} style = {isActive(history,`/user/${isAuthenticated().userId}`)}><p className = "" >{(JSON.parse(localStorage.getItem('jwt'))).prenom}</p></Link>
                                
                             
                         </li>

                        <li className="nav-item">
                            
                                <Link className="nav-link font-weight-bold text-lg-right" to = '' style ={isActive(history,"/signup")} onClick={()=>signOut(()=>{history.push('/')})}><p>Deconnexion</p></Link>
                           
                        </li>
                    </>
                )}
                
                
  
        </ul>       
    </nav>
)

export default withRouter(Menu)

