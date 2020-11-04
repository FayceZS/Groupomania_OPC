const express = require('express');  
const app = express(); 
const mysql = require ('mysql');            //
const { getAllUsers } = require('./controlers/user');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');          //On va utiliser bodyParser pour parser les requêtes json et s'en servir directement comme des objets javascript
const db = require("./models");
const { User} = require('./models/user');

app.get('/select',(req,res) => {
  res.send("select");
});

app.get('/insert',(req,res) => {
  // User.create(
  //          { 
  //           prenom : "Pedro" ,
  //           nom : "Rodriguez",
  //           sexe : "m",
  //           fonction : "tacos",
  //           mail : "PRODRI@gmail.com",
  //           password : "password"
  //         }
  // )
  // .catch(err => {
  //   if(err){
  //     console.log(err)
  //   }
  // })
});


db.sequelize.sync().then((req)=> {
app.listen(3001, () => {
  console.log('server running');
})
});


const connectToDb  = (req,res,next)=>{ 

const con= mysql.createConnection ({             //On se connecte à notre base de données mySQL
  host: 'localhost',
  user: 'root',
  password: 'Fayssal02',
  database : "groupomania" 
  
 });
con.connect ((err) => {
  if (err) throw err;
  console.log ('Connecté!');
});  

con.end ((err) => {
  // La connexion se termine normalement
  // Garantit que toutes les requêtes restantes sont exécutées
  // Envoie ensuite un paquet de sortie au serveur MySQL.
  if (err) throw err;
  console.log("Connexion réussie");
}); 

  }; 


  app.use((req, res, next) => {                                                         //On définie nos CORS pour donner l'accès du backend au frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use(bodyParser.json()); 
app.use('/auth',userRoutes);


connectToDb();



  module.exports = app;        
