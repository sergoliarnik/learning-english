const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getIndex);

router.get('/posts/:postId', userController.getPost);

router.post('/posts/:postId/comments', userController.postComment);

router.get('/tests', userController.getTests);

router.get('/tests/:testId', userController.getTest);

router.post('/tests/:testId/complete', userController.postTestComplete);

router.get('/dictionary', userController.getDictionary)

router.post('/dictionary', userController.postDictionary)



module.exports = router;
