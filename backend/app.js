const express = require('express');  
const app = express();           //
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts')
const bodyParser = require('body-parser');          //On va utiliser bodyParser pour parser les requêtes json et s'en servir directement comme des objets javascript
const path = require('path');                     //On utilise le module path pour gérer nos fichiers en l'occurence nos images
const multer = require('multer');
const commentsRoutes = require('./routes/comments');
const helmet = require('helmet');                 //On utilise helmet pour sécuriser les données headers
const rateLimit = require("express-rate-limit");        //On utilise express rate limit pour prévenir les attaques bruteforce
const xss = require('xss-clean');                        //On utilise le plugin xss-clean pour contrer les failles xss



const limiter = rateLimit({                                   //On programme un limiter pour pallier aux attaques bruteforce
  windowMs: 15 * 60 * 1000, // 15 minutes 
  max: 100 // limite chaque IP à 100 requests par windowMs
});



app.use(limiter);

app.use(xss());




  app.use((req, res, next) => {                                                         //On définie nos CORS pour donner l'accès du backend au frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); 

app.use(helmet());

app.use(bodyParser.json()); 


app.use('/auth',userRoutes);
app.use('/user',userRoutes);
app.use('/posts',postsRoutes);
app.use('/comments',commentsRoutes);
app.use('/image', express.static(path.join(__dirname,'images')));         //On rend l'application statique pour gérer les images




  module.exports = app;        
