const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Answer = sequelize.define('answer', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: Sequelize.TEXT,
  isRight: Sequelize.BOOLEAN
});

module.exports = Answer;
