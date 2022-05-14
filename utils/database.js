const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-project', 'root', 'admn.123', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;
