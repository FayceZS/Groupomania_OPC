const express = require('express');
const router = express.Router();
const postsCtrl = require("../controlers/posts");
const multer = require('../middlewares/multer-config-post');
const auth = require('../middlewares/auth');

router.get('/getAllPosts',postsCtrl.getAllPosts);
router.get('/:id',postsCtrl.getThisPost);
router.post('/createpost',multer,postsCtrl.createPost);
router.delete('/:id',postsCtrl.deleteThisPost);
router.put('/:id',multer,postsCtrl.modifyThisPost)


module.exports = router; 