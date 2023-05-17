const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-post', isAuth, adminController.getAddPost);

router.get('/posts', isAuth, adminController.getPosts);

router.post('/add-post', isAuth, adminController.postAddPost);

router.get('/edit-post/:postId', isAuth, adminController.getEditPost);

router.post('/edit-post', isAuth, adminController.postEditPost);

router.post('/delete-post', isAuth, adminController.postDeletePost);

router.get('/add-test', isAuth, adminController.getAddTest);

router.post('/add-test', isAuth, adminController.postAddTest);

router.get('/tests', isAuth, adminController.getTests);

module.exports = router;
