require('dotenv').config();

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const PostgresDBStore = require('connect-pg-simple')(session);
const flash = require('connect-flash');

const sequelize = require('./util/database');
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');
const Test = require('./models/test');
const Question = require('./models/question');
const Answer = require('./models/answer');
const Word = require('./models/word');

const app = express();
const store = new PostgresDBStore({
  conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
  tableName: 'session',
  createTableIfMissing: true
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.role = req.session.user ? req.session.user.role : "Guess";
  next();
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

Post.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Post);
Comment.belongsTo(Post, { constraints: true, onDelete: 'CASCADE' });
Post.hasMany(Comment);
Comment.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Comment);
Test.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Test);
Question.belongsTo(Test, { constraints: true, onDelete: 'CASCADE' });
Test.hasMany(Question);
Answer.belongsTo(Question, { constraints: true, onDelete: 'CASCADE' });
Question.hasMany(Answer);
Word.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Word);

sequelize
  .sync({force: false})
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });