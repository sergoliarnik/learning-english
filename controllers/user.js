const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getIndex = async (req, res) => {
  const posts = await Post.findAll();
  res.render('user/index', {
    posts: posts
  });
};

exports.getPost = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findByPk(postId, { include: [User, Comment] });
  const comments = await post.getComments({ include: [User] });

  res.render('user/post-detail', {
    postId: postId,
    post: post,
    author: post.user.email,
    comments: comments
  });
};

exports.postComment = async (req, res) => {
  const text = req.body.text;
  const postId = req.params.postId;
  const userId = req.session.user.id;

  const user = await User.findByPk(userId);
  const post = await Post.findByPk(postId);
  const comment = await Comment.create({ text });
  await comment.setUser(user);
  await comment.setPost(post);

  res.redirect('/admin/posts');
};