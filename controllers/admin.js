const Post = require('../models/post');
const User = require('../models/user');

exports.getAddPost = (req, res) => {
  res.render('admin/edit-post', {
    editing: false,
  });
};

exports.postAddPost = (req, res) => {
  const title = req.body.title;
  const text = req.body.text;
  User.findByPk(req.session.user.id).then((user) => {
    user
      .createPost({
        title: title,
        text: text,
      })
      .then(() => {
        res.redirect('/admin/posts');
      });
  });
};

exports.getEditPost = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const postId = req.params.postId;
  User.findByPk(req.session.user.id).then((user) => {
    user.getPosts({ where: { id: postId } }).then((posts) => {
      const post = posts[0];
      if (!post) {
        return res.redirect('/');
      }
      res.render('admin/edit-post', {
        editing: editMode,
        post: post,
      });
    });
  });
};

exports.postEditPost = (req, res) => {
  const postId = req.body.postId;
  const title = req.body.title;
  const text = req.body.text;

  Post.findByPk(postId).then((post) => {
    if (post.userId.toString() !== req.session.user.id.toString()) {
      return res.redirect('/');
    }
    post.title = title;
    post.text = text;
    return post.save().then(() => {
      res.redirect('/admin/posts');
    });
  });
};

exports.getPosts = (req, res) => {
  User.findByPk(req.session.user.id).then((user) => {
    user.getPosts().then((posts) => {
      res.render('admin/posts', {
        posts: posts,
      });
    });
  });
};

exports.postDeletePost = (req, res) => {
  const postId = req.body.postId;
  Post.findByPk(postId).then((post) => {
    if (post.userId.toString() !== req.session.user.id.toString()) {
      return res.redirect('/');
    }
    return post.destroy().then(() => {
      res.redirect('/admin/posts');
    });
  });
};
