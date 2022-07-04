//cliente.js
const Sequelize = require('sequelize');
const database = require('./bdorm.js');

const Cliente = database.sequelize.define('cliente', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING
    }
})

module.exports = {Cliente}
