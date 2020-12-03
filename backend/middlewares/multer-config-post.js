const multer = require('multer');               //On utilise multer pour gérer nos fichiers
const post = require('../models/publication');

const MIME_TYPES = {                //On définie les extensions qui seront acceptées pour nos images
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpeg',
    'image/png' : 'png',
    'image/gif' : 'gif'
};

const storage = multer.diskStorage({                                
    destination : (req,file,callback)=>{
        callback(null,'images');
        
    },
    filename : (req,file,callback) => {
        const name = file.originalname.split(' ').join('_').replace('.',"-");
        const extension = MIME_TYPES[file.mimetype];
        
        callback(null, 'publication' + req.body.userId+ "&" + Date.now()  + "." +extension);
        
    }


});



module.exports = multer({storage}).single('image');