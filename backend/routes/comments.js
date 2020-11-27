const express = require('express');
const router = express.Router();
const commentsCtrl = require("../controlers/comments");

router.get('/getAllComments/:id',commentsCtrl.getAllcomments);
router.get('/:id',commentsCtrl.getThisComment);
router.post('/createComment',commentsCtrl.createComment);
router.delete('/:id',commentsCtrl.deleteThisComment);
router.put('/:id',commentsCtrl.modifyThisComment)


module.exports = router; 