const Sequelize = require('sequelize');

const sequelize = new Sequelize ('webii', 'root', 'Valdesian&1', {dialect: 'mysql', host: 'localhost', port:3306});

module.exports = {sequelize};