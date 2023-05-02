const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getIndex);

router.get('/posts/:postId', userController.getPost);

module.exports = router;
