const Post = require('../models/post');
const User = require('../models/user');

exports.getAddPost = (req, res) => {
  res.render('admin/edit-post', {
    editing: false
  });
};

exports.postAddPost = async (req, res) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const text = req.body.text;
  const user = await User.findByPk(req.session.user.id);
  await user.createPost({
    title: title,
    imageUrl: imageUrl,
    text: text
  });
  res.redirect('/admin/posts');
};

exports.getEditPost = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const postId = req.params.postId;
  const user = await User.findByPk(req.session.user.id);
  const posts = await user.getPosts({ where: { id: postId } });
  const post = posts[0];
  if (!post) {
    return res.redirect('/');
  }
  res.render('admin/edit-post', {
    editing: editMode,
    post: post
  });

};

exports.postEditPost = async (req, res) => {
  const postId = req.body.postId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const text = req.body.text;

  const post = await Post.findByPk(postId);
  if (post.userId.toString() !== req.session.user.id.toString()) {
    res.redirect('/');
  }
  post.title = title;
  post.imageUrl = imageUrl;
  post.text = text;
  await post.save();
  res.redirect('/admin/posts');
};

exports.getPosts = async (req, res) => {
  const user = await User.findByPk(req.session.user.id);
  const posts = await user.getPosts();
  res.render('admin/posts', {
    posts: posts
  });
};

exports.postDeletePost = async (req, res) => {
  const postId = req.body.postId;
  const post = await Post.findByPk(postId);
  if (post.userId.toString() !== req.session.user.id.toString()) {
    return res.redirect('/');
  }
  await post.destroy();
  res.redirect('/admin/posts');
};
