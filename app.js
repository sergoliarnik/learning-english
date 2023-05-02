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

const app = express();
const store = new PostgresDBStore({
  conString: `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_NAME}`,
  tableName: 'session',
  createTableIfMissing: true,
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
    store: store,
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(authRoutes);

Post.belongsTo(User), { constraints: true, onDelete: 'CASCADE' };
User.hasMany(Post);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
