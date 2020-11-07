const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');            //On appelle les middlewares propres aux 
const auth = require('../middlewares/auth');

router.post("/signup",userCtrl.signup);             //On appelle les fonctions appropriées à nos routes
router.post('/signin',userCtrl.signin);
router.get('/signout',userCtrl.signout);
router.post('/getAllUsers',userCtrl.getAllUsers);
router.get('/:id', userCtrl.getThisUser);

// router.post("/login",userCtrl.login);

module.exports = router;