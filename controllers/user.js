const User = require('../models/user');
const Post = require('../models/post');

exports.getIndex = (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.render('user/index', {
        posts: posts,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPost = (req, res) => {
  const postId = req.params.postId;
  Post.findByPk(postId)
    .then((post) => {
      res.render('user/post-detail', {
        post: post,
      });
    })
    .catch((err) => console.log(err));
};
