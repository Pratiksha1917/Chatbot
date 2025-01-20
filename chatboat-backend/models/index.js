const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatbot', 'root', 'Password!@#', {
  host: 'localhost',
  dialect: 'mysql',
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
