const express = require('express');
require('dotenv').config();

const User = require('./models/user');
const Post = require('./models/post');

const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');

app.use(userRoutes);

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
