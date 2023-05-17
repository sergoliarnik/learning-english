const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  role: {
    type: Sequelize.STRING,
    defaultValue: "User"
  },
});


module.exports = User;
