const User = require('../models/user');
const Post = require('../models/post');

exports.getIndex = (req, res, next) => {
  Post.findAll()
    .then((posts) => {
      res.render('user/index', {
        posts: posts,
      });
    })
    .catch((err) => console.log(err));
};
