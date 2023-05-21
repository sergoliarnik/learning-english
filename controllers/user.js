const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');
const Test = require('../models/test');
const Answer = require('../models/answer');
const Word = require('../models/word');

exports.getIndex = async (req, res) => {
  const posts = await Post.findAll();
  res.render('user/index', {
    posts: posts
  });
};

exports.getPost = async (req, res) => {
  const postId = req.params.postId;
  const post = await Post.findByPk(postId, { include: [User, Comment] });
  const comments = await post.getComments({ include: [User], order: [['createdAt', 'DESC']] });

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

  res.redirect(`/posts/${postId}`);
};

exports.getTests = async (req, res) => {
  const tests = await Test.findAll();
  res.render('user/tests', {
    tests: tests
  });
};

exports.getTest = async (req, res) => {
  const testId = req.params.testId;
  const questions = await (await Test.findByPk(testId)).getQuestions({ include: Answer });
  res.render('user/test-details', {
    testId: testId,
    questions: questions
  });
};

exports.postTestComplete = async (req, res) => {
  console.log(req.body);
  let countOfRight = 0;
  const testId = req.params.testId;
  const questions = await (await Test.findByPk(testId)).getQuestions({ include: Answer });
  const duration = req.body.duration;
  delete req.body.duration;
  for (const answer in req.body) {
    if ((await Answer.findByPk(req.body[answer])).isRight) {
      countOfRight++;
    }
  }
  res.render('user/test-details-complete', {
    countOfQuestions: questions.length,
    countOfRight: countOfRight,
    duration: parseInt(duration)
  });
};

exports.getDictionary = async (req, res) => {
  const userId = req.session.user.id;

  const user = await User.findByPk(userId);
  const words = await user.getWords();
  res.render('user/dictionary', {
    words: words
  });
};

exports.postDictionary = async (req, res) => {
  const userId = req.session.user.id;

  const user = await User.findByPk(userId);
  const word = req.body.word;
  const definition = req.body.definition;
  await user.createWord({ text: word, definition: definition });

  const words = await user.getWords();
  console.log(req.body);
  res.render('user/dictionary', {
    words: words
  });
};

