const express = require('express');
const router = express.Router();
const userCtrl = require('../controlers/user');            //On appelle les middlewares propres aux users

router.post("/signup",userCtrl.signup);             //On appelle les fonctions appropriées à nos routes
router.post('/signin',userCtrl.signin);
router.post('/getAllUsers',userCtrl.getAllUsers);
// router.post("/login",userCtrl.login);

module.exports = router;