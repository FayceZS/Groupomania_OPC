const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');            //On appelle les middlewares propres aux 
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

router.post("/signup",multer,userCtrl.signup);             //On appelle les fonctions appropriées à nos routes
router.post('/signin',userCtrl.signin);
router.get('/signout',userCtrl.signout);
router.get('/getAllUsers',auth,userCtrl.getAllUsers);
router.delete('/:id',userCtrl.deleteThisUser);
router.get('/:id',auth,userCtrl.getThisUser);
router.put('/:id',multer,auth, userCtrl.modifyThisUser)

// router.post("/login",userCtrl.login);

module.exports = router;