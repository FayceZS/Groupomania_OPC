import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import{ signOut, isAuthenticated} from '../auth';




const isActive = (history,path) => {
    if(history.location.pathname === path) return {color : '#303030'}
    else{ return {color : "#ffffff"}}
}

const callMenu = ()=>{
       
        const menu = document.getElementsByClassName('nav-item');
        const array = Array.prototype.slice.call(menu);
        array.forEach(element => {
                if(element.style.display == "none"){
                        element.style.display = "flex"
                }else{
                        element.style.display = "none"
                };

                
        });
}

const addEventMenuIcon = ()=>{
               console.log(document.querySelector('#menuIcon'))
                               }





const Menu = ({history}) => (
    <nav>
         
         
        <ul className="nav nav-pills nav-fill ">
        {/* <img src= './icon.png' id = "logoNav"alt='logo'/>        */}
        <span id='callMenuButton' onClick={callMenu}><i className='fas fa-sort-amount-down w3-xxlarge w3-text-white'></i></span>
            <div className = 'menuButtons'>

           

                <li className="nav-item">
                     {/* <div className="nav-link font-weight-bold text-lg-right" >    */}
                        <Link className="btn btn-primary btn-lg btn-block btn-nav" style ={isActive(history,"/")} to='/' id="accueil" ><i className='fas fa-warehouse w3-xxlarge w3-text-white'></i>  Accueil</Link>
                     {/* </div>  */}
                </li>

                
           

                {!isAuthenticated() && (
                    
                        <>
                            <li className="nav-item">
                                
                                    <Link className="btn btn-primary btn-lg btn-block btn-nav" style ={isActive(history,"/signin")} to='/signin' ><i className='fa fa-angle-double-right w3-xxlarge w3-text-white'></i>   Connexion</Link>
                               
                            </li>

                            <li className="nav-item">
                                
                                    <Link className="btn btn-primary btn-lg btn-block btn-nav" style ={isActive(history,"/signup")} to='/signup' ><i className='fas fa-edit w3-xxlarge w3-text-white'></i>  S'inscrire</Link>
                               
                            </li>
                         </>
                          
                )}

                {isAuthenticated() &&(
                    <>
                        <li className="nav-item">
                            
                                <Link className="btn btn-primary btn-lg btn-block btn-nav" style ={isActive(history,"/")} to='/users' id="accueil" ><i className='fas fa-user-friends w3-xxlarge w3-text-white'></i>   Collègues</Link>
                            
                        </li>

                        {/* <li className="nav-item">
                            
                                <Link className="nav-link font-weight-bold text-lg-right" style ={isActive(history,"/")} to='/post/createpost' id="createpost" ><p>Publications</p></Link>
                            
                        </li> */}
                        
                        <li className="nav-item">
                            
                                <Link className="btn btn-primary btn-lg btn-block btn-nav" to = {`/user/${isAuthenticated().userId}`}><i className='fas fa-user-alt w3-xxlarge w3-text-white'></i>  Profil</Link>
                                
                             
                         </li>

                        <li className="nav-item">
                            
                                <Link className="btn btn-primary btn-lg btn-block btn-nav" to = '' style ={isActive(history,"/signup")} onClick={()=>signOut(()=>{history.push('/')})}><i className='fas fa-share-square w3-xxlarge w3-text-white'></i>   Deconnexion</Link>
                           
                        </li>
                    </>
                )}
                
             </div>
  
        </ul>       
    </nav>

//     {(
//            <> 
//          const addEventMenuIcon = ()=>{
//         console.log(document.querySelector('#menuIcon'))
//                         }

//                         addEventMenuIcon();   

//         </>)}
//     
    
)





export default withRouter(Menu)

