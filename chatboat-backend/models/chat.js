const { Sequelize, DataTypes } = require('sequelize');
const db = require('./index');

const Chat = db.sequelize.define('Chat', {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Chat;
