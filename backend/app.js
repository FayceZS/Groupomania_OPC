const express = require('express');  
const app = express(); 
const mysql = require ('mysql');            //
const { getAllUsers } = require('./controlers/user');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');          //On va utiliser bodyParser pour parser les requêtes json et s'en servir directement comme des objets javascript
const db = require("./models");
const { User} = require('./models/user');






  app.use((req, res, next) => {                                                         //On définie nos CORS pour donner l'accès du backend au frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use(bodyParser.json()); 
app.use('/auth',userRoutes);





  module.exports = app;        
