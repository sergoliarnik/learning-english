const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getIndex);

router.get('/posts/:postId', userController.getPost);

router.post('/posts/:postId/comments', userController.postComment);

router.get('/tests', userController.getTests);

router.get('/tests/:testId', userController.getTest);

router.post('/tests/:testId/complete', userController.postTestComplete);

module.exports = router;
