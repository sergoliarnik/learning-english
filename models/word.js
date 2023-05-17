const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Word = sequelize.define('word', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: Sequelize.TEXT,
  definition: Sequelize.TEXT,
});

module.exports = Word;
