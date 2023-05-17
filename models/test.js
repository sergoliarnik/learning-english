const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Test = sequelize.define('test', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.TEXT,
  imageUrl: Sequelize.TEXT
});

module.exports = Test;
