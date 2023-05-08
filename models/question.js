const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Question = sequelize.define('question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.TEXT,
});

module.exports = Question;
