const multer = require('multer');               //On utilise multer pour gérer nos fichiers
const user = require('../models/user');

const MIME_TYPES = {                //On définie les extensions qui seront acceptées pour nos images
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const storage = multer.diskStorage({                                
    destination : (req,file,callback)=>{
        callback(null,'images')
    },
    filename : (req,file,callback) => {
        const name = file.originalname.split(' ').join('_').replace('.',"-");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, 'user' + Date.now().toString().substring(0,4) + (Math.random()*100).toString().substring(0,4).replace(".","-")  + "." +extension);
    }
});

module.exports = multer({storage}).single('image');