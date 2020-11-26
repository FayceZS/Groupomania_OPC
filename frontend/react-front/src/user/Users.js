import React, { Component } from "react";
import { list } from "./apiUser";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list(isAuthenticated().token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = (users) => (
     


    <div className="row">
      {
      
      
      users.map((user, i) => (
        
        <div
          className="card "
          key={i}
        >
          <img className="card-img-top" id="usersImg" src={user.imageUrl} alt={user.prenom}  />
          <div className="card-body">
              <div id="card-bodyContent">
                <h5 className="card-title">
                  {user.prenom} {user.nom}
                </h5>
                <p className="card-text">{user.fonction}</p>
              </div>
            </div>
            <Link to={`user/${user.id}`} className="btn btn-raised btn-primary btn-small" id="goProfil">
              Voir profil
            </Link>
          
        </div> 


      ))
      
      
      }
    </div>
  );

  render() {
    const { users } = this.state;
    
    
    return (
      <div className="container" >
        <h2 className="mt-5 mb-5">Nos collègues :</h2>
        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
